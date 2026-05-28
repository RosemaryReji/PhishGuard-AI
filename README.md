# PhishGuard AI - Deployment Guide

Welcome to the final phase of PhishGuard AI. The application is completely built and integrated. Follow these exact steps to deploy your application to production.

## 1. Setup Required Accounts & Keys

Before deploying, ensure you have active accounts and API keys for the following services:
- **Clerk**: Authentication (Publishable Key, Secret Key, Webhook Secret).
- **Supabase**: Database (Project URL, Service Role Key).
- **Gemini**: AI SDK (API Key).
- **PostHog** *(Optional)*: Analytics (Project API Key).

## 2. Deploy Frontend to Vercel

The Next.js 15 application is located in the `frontend/` directory.

1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com/) and create a **New Project**.
3. Import your GitHub repository.
4. Set the **Root Directory** to `frontend/`.
5. Add the following **Environment Variables**:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
   CLERK_SECRET_KEY=your_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   CLERK_WEBHOOK_SECRET=your_svix_webhook_secret
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   NEXT_PUBLIC_API_URL=https://your-railway-backend-url.up.railway.app
   NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
   NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
   ```
6. Click **Deploy**.

## 3. Deploy Backend to Railway

The Python FastAPI application is located in the `backend/` directory.

1. Go to [Railway](https://railway.app/) and create a **New Project**.
2. Select **Deploy from GitHub repo** and choose your repository.
3. In the Railway dashboard, configure the service:
   - Go to **Settings > Root Directory** and set it to `/backend`.
   - Ensure the Start Command is automatically detected (it should run `uvicorn main:app --host 0.0.0.0 --port $PORT`).
4. Go to **Variables** and add:
   ```
   GEMINI_API_KEY=your_gemini_api_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_service_role_key
   CLERK_ISSUER_URL=https://your-clerk-issuer.clerk.accounts.dev
   CLERK_AUDIENCE=your-audience
   ```
5. Railway will automatically build and deploy your API.

## 4. End-to-End Validation

Once both services are deployed:
1. Visit your Vercel URL.
2. Sign up for a new account (this should trigger the webhook and create a record in Supabase).
3. Navigate to the Dashboard.
4. Paste a malicious text into the "Analyze Message" tool.
5. Verify that the AI Risk Meter correctly classifies the threat.
6. Verify that your History page correctly logs the AI analysis via Supabase.

Congratulations, PhishGuard AI is live! 🎉
