"""API contracts used by the redesigned frontend, using an isolated in-memory database."""
import hashlib
import hmac
import unittest
from types import SimpleNamespace
from unittest.mock import patch

from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app import main
from app.database import get_db
from app.models import User
from app.security import hash_password, token_for


class RedesignWorkflows(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine('sqlite://', connect_args={'check_same_thread': False}, poolclass=StaticPool)
        self.sessions = sessionmaker(bind=self.engine)

        def database():
            with self.sessions() as session:
                yield session

        main.app.dependency_overrides[get_db] = database
        self.patches = [
            patch.object(main, 'engine', self.engine),
            patch.object(main, 'SessionLocal', self.sessions),
            patch.object(main.settings, 'bootstrap_admin_email', ''),
            patch.object(main.settings, 'bootstrap_admin_password', ''),
            patch.object(main.settings, 'razorpay_key_id', 'rzp_test_local'),
            patch.object(main.settings, 'razorpay_key_secret', 'isolated-test-secret'),
        ]
        for item in self.patches:
            item.start()
        self.client = TestClient(main.app)
        self.client.__enter__()

    def tearDown(self):
        self.client.__exit__(None, None, None)
        main.app.dependency_overrides.clear()
        for item in reversed(self.patches):
            item.stop()
        self.engine.dispose()

    def student(self):
        response = self.client.post('/api/auth/register', json={
            'name': 'Workflow Test', 'email': 'workflow@example.com', 'password': 'LocalWorkflowTest123!'
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['user']['role'], 'student')
        return {'Authorization': 'Bearer ' + response.json()['access_token']}

    def test_authentication_and_admin_authorization(self):
        self.assertEqual(self.client.get('/api/me').status_code, 401)
        headers = self.student()
        self.assertEqual(self.client.get('/api/me', headers=headers).status_code, 200)
        self.assertEqual(self.client.get('/api/admin/summary', headers=headers).status_code, 403)
        login = self.client.post('/api/auth/login', json={'email': 'workflow@example.com', 'password': 'LocalWorkflowTest123!'})
        self.assertEqual(login.status_code, 200)
        with self.sessions() as session:
            admin = User(name='Test Admin', email='admin@example.com', password_hash=hash_password('LocalAdmin123!'), role='admin')
            session.add(admin)
            session.commit()
            session.refresh(admin)
            token = token_for(admin)
        admin_headers = {'Authorization': 'Bearer ' + token}
        created = self.client.post('/api/admin/courses', headers=admin_headers, json={'title': 'QA Course', 'price': 100})
        self.assertEqual(created.status_code, 200)
        self.assertFalse(created.json()['is_published'])

    def test_booking_and_catalog_contracts(self):
        courses = self.client.get('/api/courses').json()
        self.assertEqual(len(courses), 3)
        self.assertEqual(self.client.get('/api/courses/slug/' + courses[0]['slug']).status_code, 200)
        self.assertEqual(self.client.get('/api/courses/slug/missing-course').status_code, 404)
        response = self.client.post('/api/bookings', json={
            'name': 'Booking Test', 'email': 'booking@example.com', 'phone': '0000000000',
            'type': 'In-person session', 'date': '', 'message': 'Isolated verification'
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'requested')
        self.assertIsInstance(response.json()['id'], int)
        self.assertEqual(self.client.post('/api/bookings', json={}).status_code, 422)

    def test_payment_verification_controls_enrollment(self):
        headers = self.student()
        course = self.client.get('/api/courses').json()[0]
        provider = SimpleNamespace(Client=lambda **kwargs: SimpleNamespace(order=SimpleNamespace(create=lambda data: {'id': 'order_local_qa'})))
        with patch.object(main, 'razorpay', provider):
            response = self.client.post('/api/payments/create-order', headers=headers, json={'course_id': course['id']})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['amount'], course['price'] * 100)
        payload = {'order_id': 'order_local_qa', 'payment_id': 'pay_local_qa', 'signature': 'invalid'}
        self.assertEqual(self.client.post('/api/payments/verify', headers=headers, json=payload).status_code, 400)
        self.assertEqual(self.client.get('/api/me/enrollments', headers=headers).json(), [])
        payload['signature'] = hmac.new(b'isolated-test-secret', b'order_local_qa|pay_local_qa', hashlib.sha256).hexdigest()
        self.assertEqual(self.client.post('/api/payments/verify', headers=headers, json=payload).status_code, 200)
        enrollments = self.client.get('/api/me/enrollments', headers=headers).json()
        self.assertEqual(enrollments[0]['course_id'], course['id'])
        self.assertEqual(enrollments[0]['status'], 'paid')


if __name__ == '__main__':
    unittest.main()
