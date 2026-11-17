# API reference
Base URL: `/api`
- `GET /health` — health check
- `POST /auth/register` — create student account
- `POST /auth/login` — obtain JWT
- `GET /me` — current user
- `GET /courses` — published course catalog
- `GET /courses/slug/{slug}` — published course details
- `POST /bookings` — request online/offline appointment
- `POST /payments/create-order` — create Razorpay order (JWT)
- `POST /payments/verify` — verify Razorpay signature (JWT)
- `GET /me/enrollments` — paid course enrollments (JWT)
- `GET/POST /admin/courses` — admin course listing/creation
- `PATCH/DELETE /admin/courses/{id}` — admin update/delete
- `GET /admin/bookings` — admin booking list
- `GET /admin/summary` — admin counts
- `POST /payments/webhook` — Razorpay webhook signature validation
