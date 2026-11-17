# Production security checklist
- Replace JWT secret and admin password before first deployment.
- Add Google OAuth authorization-code flow and validate provider ID tokens server-side before enabling the UI.
- Add email verification, password reset, login throttling, CSRF strategy for cookie auth, and audit logs.
- Validate Razorpay webhook events and reconcile payment.captured/payment.failed idempotently. Never trust client-side payment status.
- Implement signed private video playback URLs and ensure only paid students can access lesson media.
- Add lesson/module/enrollment schema and progress tracking before uploading course content.
- Use database migrations (Alembic) rather than create_all for production schema changes.
- Add admin CRUD screens for students, orders, blog posts, course modules, lessons and media.
- Add consent, privacy policy, terms, refund/cancellation policy and medical disclaimer reviewed by the client.
