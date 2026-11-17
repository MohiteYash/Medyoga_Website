from pydantic_settings import BaseSettings, SettingsConfigDict
class Settings(BaseSettings):
    database_url:str='sqlite:///./medyoga.db'
    jwt_secret:str='unsafe-development-secret-change-me'
    jwt_algorithm:str='HS256'
    access_token_minutes:int=10080
    razorpay_key_id:str=''
    razorpay_key_secret:str=''
    razorpay_webhook_secret:str=''
    bootstrap_admin_email:str=''
    bootstrap_admin_password:str=''
    frontend_origin:str='http://localhost:5173'
    model_config=SettingsConfigDict(env_file='.env',extra='ignore')
settings=Settings()
