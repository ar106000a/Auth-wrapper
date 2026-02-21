# Deployment Guide

## Requirements

- Node.js >= 18
- Supabase project
- Environment variables configured

---

## Environment Variables

SUPABASE_URL=
SUPABASE_ANON_KEY=
NODE_ENV = 
JWT_REFRESH_SECRET=
JWT_RESET_SECRET=
JWT_ACCESS_SECRET=
JWT_CONFIRM_SECRET=
PORT= 
SESSION_MAX_AGE_DAYS=
ORIGIN=

---

## Run Locally

- npm install
- npm run dev


Server runs on:

- http://localhost:5000


Health check:

- POST system/health


---

## Production Steps

1. Set environment variables on hosting platform
2. Enable HTTPS
3. Configure secure cookies
4. Connect production Supabase database
5. Verify auth flow end-to-end

---

## Recommended Hosting

- Render
- Railway
- Fly.io