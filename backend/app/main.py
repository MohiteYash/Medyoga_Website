
import re,hmac,hashlib
from fastapi import FastAPI,Depends,HTTPException,Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import select,func
from .config import settings
from .database import Base,engine,get_db,SessionLocal
from .models import User,Course,Booking,Order
from .schemas import RegisterIn,LoginIn,CourseIn,BookingIn,OrderIn,VerifyPaymentIn
from .security import hash_password,verify_password,token_for,current_user,admin_user
try:
 import razorpay
except ImportError: razorpay=None
app=FastAPI(title='MedYoga API',version='1.0.0',description='Medical yoga learning and booking platform API')
app.add_middleware(CORSMiddleware,allow_origins=[settings.frontend_origin,'http://127.0.0.1:5173'],allow_credentials=True,allow_methods=['*'],allow_headers=['*'])
def slugify(s): return re.sub(r'[^a-z0-9]+','-',s.lower()).strip('-')
def course_out(c): return {'id':c.id,'title':c.title,'slug':c.slug,'description':c.description,'price':c.price,'level':c.level,'duration':c.duration,'image_url':c.image_url,'is_published':c.is_published}
@app.on_event('startup')
def startup():
    Base.metadata.create_all(bind=engine)
    db=SessionLocal()
    try:
        if db.scalar(select(func.count(Course.id)))==0:
            samples=[
            Course(title='Foundations of Medical Yoga',slug='foundations-medical-yoga',description='An introductory learning pathway exploring safe movement, breath awareness and foundational principles of medical yoga.',price=1499,level='Beginner',duration='4 weeks',image_url='https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=85',is_published=True),
            Course(title='Therapeutic Yoga & Mobility',slug='therapeutic-yoga-mobility',description='Explore mobility, alignment and supported yoga practices for general wellness and movement awareness.',price=1999,level='All levels',duration='6 weeks',image_url='https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=1000&q=85',is_published=True),
            Course(title='Pranayama & Mindful Practice',slug='pranayama-mindful-practice',description='A structured introduction to breath practices, relaxation and mindful routines.',price=999,level='Beginner',duration='3 weeks',image_url='https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=85',is_published=True)]
            db.add_all(samples)
        if settings.bootstrap_admin_email and settings.bootstrap_admin_password and not db.scalar(select(User).where(User.email==settings.bootstrap_admin_email.lower())):
            db.add(User(name='MedYoga Admin',email=settings.bootstrap_admin_email.lower(),password_hash=hash_password(settings.bootstrap_admin_password),role='admin'))
        db.commit()
    finally: db.close()
@app.get('/api/health')
def health(): return {'status':'ok','service':'medyoga-api'}
@app.post('/api/auth/register')
def register(data:RegisterIn,db:Session=Depends(get_db)):
    email=data.email.lower()
    if db.scalar(select(User).where(User.email==email)): raise HTTPException(409,'Email already registered')
    u=User(name=data.name,email=email,password_hash=hash_password(data.password),role='student');db.add(u);db.commit();db.refresh(u)
    return {'access_token':token_for(u),'token_type':'bearer','user':{'id':u.id,'name':u.name,'email':u.email,'role':u.role}}
@app.post('/api/auth/login')
def login(data:LoginIn,db:Session=Depends(get_db)):
    u=db.scalar(select(User).where(User.email==data.email.lower()))
    if not u or not verify_password(data.password,u.password_hash): raise HTTPException(401,'Incorrect email or password')
    return {'access_token':token_for(u),'token_type':'bearer','user':{'id':u.id,'name':u.name,'email':u.email,'role':u.role}}
@app.get('/api/me')
def me(u:User=Depends(current_user)):return {'id':u.id,'name':u.name,'email':u.email,'role':u.role}
@app.get('/api/courses')
def courses(db:Session=Depends(get_db)):
    return [course_out(c) for c in db.scalars(select(Course).where(Course.is_published==True).order_by(Course.id.desc())).all()]
@app.get('/api/courses/slug/{slug}')
def course_by_slug(slug:str,db:Session=Depends(get_db)):
    c=db.scalar(select(Course).where(Course.slug==slug,Course.is_published==True))
    if not c:raise HTTPException(404,'Course not found')
    return course_out(c)
@app.post('/api/bookings')
def create_booking(data:BookingIn,db:Session=Depends(get_db)):
    b=Booking(**data.model_dump());db.add(b);db.commit();db.refresh(b);return {'id':b.id,'status':b.status,'message':'Booking request received'}
@app.post('/api/payments/create-order')
def create_order(data:OrderIn,u:User=Depends(current_user),db:Session=Depends(get_db)):
    c=db.get(Course,data.course_id)
    if not c or not c.is_published:raise HTTPException(404,'Course unavailable')
    if not settings.razorpay_key_id or not settings.razorpay_key_secret or razorpay is None:raise HTTPException(503,'Razorpay is not configured. Add API credentials to backend .env.')
    client=razorpay.Client(auth=(settings.razorpay_key_id,settings.razorpay_key_secret))
    order=client.order.create({'amount':c.price*100,'currency':'INR','receipt':f'medyoga-course-{c.id}-user-{u.id}'})
    record=Order(user_id=u.id,course_id=c.id,amount=c.price,provider_order_id=order['id'],status='created');db.add(record);db.commit()
    return {'order_id':order['id'],'amount':c.price*100,'currency':'INR','key_id':settings.razorpay_key_id,'course_title':c.title}
@app.post('/api/payments/verify')
def verify_payment(data:VerifyPaymentIn,u:User=Depends(current_user),db:Session=Depends(get_db)):
    order=db.scalar(select(Order).where(Order.provider_order_id==data.order_id,Order.user_id==u.id))
    if not order:raise HTTPException(404,'Order not found')
    message=f"{data.order_id}|{data.payment_id}".encode()
    expected=hmac.new(settings.razorpay_key_secret.encode(),message,hashlib.sha256).hexdigest()
    if not hmac.compare_digest(expected,data.signature):raise HTTPException(400,'Payment signature verification failed')
    order.provider_payment_id=data.payment_id;order.status='paid';db.commit()
    return {'status':'paid','message':'Payment verified and enrollment activated'}
@app.get('/api/me/enrollments')
def enrollments(u:User=Depends(current_user),db:Session=Depends(get_db)):
    rows=db.execute(select(Order,Course).join(Course,Order.course_id==Course.id).where(Order.user_id==u.id,Order.status=='paid')).all()
    return [{'id':o.id,'course_id':c.id,'course_title':c.title,'status':o.status,'amount':o.amount} for o,c in rows]
@app.post('/api/admin/courses')
def admin_create_course(data:CourseIn,u:User=Depends(admin_user),db:Session=Depends(get_db)):
    slug=slugify(data.title)
    if db.scalar(select(Course).where(Course.slug==slug)):slug+=f'-{int(func.random()) if False else "new"}'
    c=Course(**data.model_dump(),slug=slug);db.add(c);db.commit();db.refresh(c);return course_out(c)
@app.get('/api/admin/courses')
def admin_courses(u:User=Depends(admin_user),db:Session=Depends(get_db)):return [course_out(c) for c in db.scalars(select(Course)).all()]
@app.patch('/api/admin/courses/{course_id}')
def update_course(course_id:int,data:CourseIn,u:User=Depends(admin_user),db:Session=Depends(get_db)):
    c=db.get(Course,course_id)
    if not c:raise HTTPException(404,'Course not found')
    for k,v in data.model_dump().items():setattr(c,k,v)
    db.commit();db.refresh(c);return course_out(c)
@app.delete('/api/admin/courses/{course_id}')
def delete_course(course_id:int,u:User=Depends(admin_user),db:Session=Depends(get_db)):
    c=db.get(Course,course_id)
    if not c:raise HTTPException(404,'Course not found')
    db.delete(c);db.commit();return {'deleted':True}
@app.get('/api/admin/bookings')
def admin_bookings(u:User=Depends(admin_user),db:Session=Depends(get_db)):
    return [{'id':b.id,'name':b.name,'email':b.email,'phone':b.phone,'type':b.type,'date':b.date,'message':b.message,'status':b.status} for b in db.scalars(select(Booking).order_by(Booking.id.desc())).all()]
@app.get('/api/admin/summary')
def admin_summary(u:User=Depends(admin_user),db:Session=Depends(get_db)):
    return {'courses':db.scalar(select(func.count(Course.id))),'students':db.scalar(select(func.count(User.id)).where(User.role=='student')),'orders':db.scalar(select(func.count(Order.id)))}
@app.post('/api/payments/webhook')
async def payment_webhook(request:Request):
    body=await request.body();sig=request.headers.get('X-Razorpay-Signature','')
    if not settings.razorpay_webhook_secret:raise HTTPException(503,'Webhook secret not configured')
    expected=hmac.new(settings.razorpay_webhook_secret.encode(),body,hashlib.sha256).hexdigest()
    if not hmac.compare_digest(expected,sig):raise HTTPException(400,'Invalid webhook signature')
    # Production: parse payment.captured events and idempotently reconcile the matching order.
    return {'received':True}
