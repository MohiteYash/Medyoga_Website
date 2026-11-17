from pydantic import BaseModel,EmailStr,Field
class RegisterIn(BaseModel):
    name:str=Field(min_length=2,max_length=120)
    email:EmailStr
    password:str=Field(min_length=8,max_length=128)
class LoginIn(BaseModel):
    email:EmailStr
    password:str
class CourseIn(BaseModel):
    title:str
    description:str=''
    price:int=Field(ge=0)
    level:str='All levels'
    duration:str='To be announced'
    image_url:str=''
    is_published:bool=False
class BookingIn(BaseModel):
    name:str
    email:EmailStr
    phone:str
    type:str
    date:str=''
    message:str=''
class OrderIn(BaseModel):
    course_id:int
class VerifyPaymentIn(BaseModel):
    order_id:str
    payment_id:str
    signature:str
