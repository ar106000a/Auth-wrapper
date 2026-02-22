# Auth Wrapper API

Production-ready authentication API built with Node.js and Express.\
Deployed on Railway. Email delivery powered by Gmail API over HTTPS.

---

## Overview

Auth wrapper is a secure, JWT-based authentication service designed for:

- SPA frontends (React / Next / Vue)

- Mobile apps

- Backend-to-backend authentication

- SaaS MVP foundations

It implements:

- Access + Refresh token architecture

- Email verification

- Password reset flow

- Rate limiting

- Structured error handling

- Integration tests (Jest + Supertest)

---

## Tech Stack

- Node.js

- Express

- PostgreSQL

- bcrypt (12 salt rounds)

- JWT

- Gmail API (OAuth2, HTTPS-based email sending)

- Jest + Supertest

- Railway (deployment)

---

## Architecture

The system follows a modular layered structure:

controllers/\
routes/\
middleware/\
utils/\
db/\
tests/

Auth design:

- Access Token → short-lived, returned in response body

- Refresh Token → stored in httpOnly cookie

- Email Verification → JWT-based (10 min expiry)

- Password Reset → token-based with expiry

- Rate Limiting → IP-based protection across routes

---

## Authentication Flow

### Registration

1.  User submits credentials

2.  Password hashed (bcrypt, 12 rounds)

3.  User created (isVerified = false)

4.  Email verification token issued

5.  Verification email sent via Gmail API

If email exists and unverified:

- User record updated

- New verification email sent

If email exists and verified:

- 403 Forbidden returned

---

### Email Verification

- JWT-based token

- 10-minute expiry

- On success:
  - isVerified set to true

  - Access + Refresh tokens issued

---

### Login

- Validates credentials

- Blocks unverified accounts

- Returns:
  - Access token (response body)

  - Refresh token (httpOnly cookie)

---

### Token Strategy

Access Token:

- Short-lived

- Sent in Authorization header

- Used for protected routes

Refresh Token:

- Stored in httpOnly cookie

- Rotated on refresh

- Used to obtain new access tokens

---

### Password Reset

1.  User requests reset

2.  Token generated and stored in DB

3.  Reset email sent via Gmail API

4.  Token verified on submission

5.  Password updated

6.  Sessions invalidated

---

## Security Features

- bcrypt password hashing (12 rounds)

- JWT-based access control

- httpOnly cookies

- IP-based rate limiting

- Structured error responses

- No sensitive data in responses

- CORS configuration for production

---

## API Endpoints

Auth Routes:

- POST /api/auth/register

- POST /api/auth/confirm_email

- POST /api/auth/login

- POST /api/auth/password/otp

-   POST /api/auth/password/verify

- POST /api/auth/refresh

- POST /api/auth/logout

- POST /api/auth/username

- POST /api/auth/password/reset

Protected Route Example:

- POST /app/getprofile

Health Check:

- POST /system/health

---

## Environment Variables

Required:

SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
NODE_ENV = production/development
JWT_REFRESH_SECRET=Refresh_token_secret_key
JWT_RESET_SECRET=Reset_token_secret_key
JWT_ACCESS_SECRET=Access_token_secret_key
JWT_CONFIRM_SECRET=email_confirm_token_secret_key
PORT= (your_port)
SESSION_MAX_AGE_DAYS=7
ORIGIN=hosted url whether its localhost or production
GMAIL_CLIENT_ID= (From Google Cloud)
GMAIL_CLIENT_SECRET= (From Google Cloud)
GMAIL_REFRESH_TOKEN= (From the Playground)
EMAIL_USER= (Your Gmail address)

Never commit secrets.

---

## Running Locally

Install dependencies:

npm install

Start dev server:

npm run dev

Run tests:

npm test

---

## Deployment

Hosted on Railway.

Email delivery uses Gmail API (HTTPS-based), avoiding SMTP port restrictions commonly enforced by cloud providers.

---

## Testing

Integration tests implemented with:

- Jest

- Supertest

Covered flows:

- Register

- Login

- Refresh

- Validation failures

- Rate limiting

Run with:

npm test

---

## Future Improvements (v1.1 Roadmap)

- Refresh token persistence in DB

- Session revocation

- Device/session tracking

- Hashed password reset tokens

- Redis-based distributed rate limiting

- True refresh token rotation detection

---

## Intended Use

This project is designed as:

- A production-ready auth foundation

- A SaaS MVP backend

- A portfolio-grade authentication system

---

## License

MIT
