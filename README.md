
# MedYoga

Medical yoga, rehabilitation and online learning platform for Dr. Pradnyesh Naikwade.

## Stack
- Frontend: React, TypeScript, Vite, React Router, Tailwind CSS
- Backend: FastAPI, SQLAlchemy 2, PostgreSQL, JWT
- Payments: Razorpay order creation + signature verification (credentials required)
- Authentication: email/password JWT; Google OAuth is scaffolded for configuration
- Media: image/video URLs are configurable; production should use private object storage for paid lesson videos.

## Quick start

### 1. Backend
```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
copy .env.example .env   # Windows; use cp on macOS/Linux
uvicorn app.main:app --reload
```
API docs: http://localhost:8000/docs

### 2. Frontend
```bash
cd frontend
npm install
copy .env.example .env   # Windows; use cp on macOS/Linux
npm run dev
```
Frontend: http://localhost:5173

## Important production setup
1. Create a PostgreSQL database and set `DATABASE_URL`.
2. Set a long random `JWT_SECRET`.
3. Add Razorpay key ID and secret. Configure webhook endpoint `/api/payments/webhook` in Razorpay. Verify payment signatures server-side.
4. Configure Google OAuth credentials and authorized redirect origins before enabling Google sign-in.
5. Use HTTPS, secure hosting, database backups, rate limiting, email verification, password reset and audit logging.
6. Store paid lesson videos in private storage and issue short-lived signed playback URLs. Do not use public permanent video URLs for paid content.
7. Replace sample course content, contact information, booking availability, policies and instructor biography with client-approved information.
8. Have the client review medical wording. Yoga/rehabilitation content must not promise cures or replace clinical diagnosis or treatment.

## Seed data
The backend creates tables and inserts three sample courses on first startup. These are placeholders and can be edited/deleted through the admin endpoints. Set `BOOTSTRAP_ADMIN_EMAIL` and `BOOTSTRAP_ADMIN_PASSWORD` in `.env` before first startup to create the first admin user.

## Project structure
- `frontend/`: multi-page responsive website, course catalog, course detail, auth, student dashboard, booking and admin views.
- `backend/`: FastAPI API, SQLAlchemy models, JWT auth, course, booking and Razorpay payment endpoints.
