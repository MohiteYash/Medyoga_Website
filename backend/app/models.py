from sqlalchemy import String,Text,Boolean,Integer,DateTime,ForeignKey,Float,func
from sqlalchemy.orm import Mapped,mapped_column,relationship
from .database import Base
class User(Base):
    __tablename__='users'
    id:Mapped[int]=mapped_column(primary_key=True)
    name:Mapped[str]=mapped_column(String(120))
    email:Mapped[str]=mapped_column(String(255),unique=True,index=True)
    password_hash:Mapped[str]=mapped_column(String(255))
    role:Mapped[str]=mapped_column(String(20),default='student')
    created_at:Mapped[DateTime]=mapped_column(DateTime(timezone=True),server_default=func.now())
class Course(Base):
    __tablename__='courses'
    id:Mapped[int]=mapped_column(primary_key=True)
    title:Mapped[str]=mapped_column(String(180))
    slug:Mapped[str]=mapped_column(String(200),unique=True,index=True)
    description:Mapped[str]=mapped_column(Text,default='')
    price:Mapped[int]=mapped_column(Integer,default=0)
    level:Mapped[str]=mapped_column(String(60),default='All levels')
    duration:Mapped[str]=mapped_column(String(60),default='To be announced')
    image_url:Mapped[str]=mapped_column(String(1000),default='')
    is_published:Mapped[bool]=mapped_column(Boolean,default=False)
    created_at:Mapped[DateTime]=mapped_column(DateTime(timezone=True),server_default=func.now())
class Booking(Base):
    __tablename__='bookings'
    id:Mapped[int]=mapped_column(primary_key=True)
    name:Mapped[str]=mapped_column(String(120))
    email:Mapped[str]=mapped_column(String(255))
    phone:Mapped[str]=mapped_column(String(40))
    type:Mapped[str]=mapped_column(String(60))
    date:Mapped[str]=mapped_column(String(30),default='')
    message:Mapped[str]=mapped_column(Text,default='')
    status:Mapped[str]=mapped_column(String(30),default='requested')
    created_at:Mapped[DateTime]=mapped_column(DateTime(timezone=True),server_default=func.now())
class Order(Base):
    __tablename__='orders'
    id:Mapped[int]=mapped_column(primary_key=True)
    user_id:Mapped[int]=mapped_column(ForeignKey('users.id'))
    course_id:Mapped[int]=mapped_column(ForeignKey('courses.id'))
    amount:Mapped[int]=mapped_column(Integer)
    currency:Mapped[str]=mapped_column(String(5),default='INR')
    status:Mapped[str]=mapped_column(String(30),default='created')
    provider_order_id:Mapped[str]=mapped_column(String(120),default='')
    provider_payment_id:Mapped[str]=mapped_column(String(120),default='')
    created_at:Mapped[DateTime]=mapped_column(DateTime(timezone=True),server_default=func.now())
