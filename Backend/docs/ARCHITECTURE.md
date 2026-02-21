# Backend Architecture

## Overview
This backend provides a production-ready authentication system built with:

- Node.js
- Express.js
- Supabase (PostgreSQL)
- JWT authentication
- HTTP-only refresh cookies

---

## Folder Structure

- **controllers/** → request handling logic  
- **routes/** → endpoint definitions  
- **middleware/** → auth, error handling, logging  
- **utils/** → reusable helpers (tokens, OTP, mail, errors)  
- **db/** → database client and schema  
- **tests/** → automated tests (planned)
- **docs/** → documentations

---

## Authentication Flow

1. User registers → OTP sent via email  
2. Email confirmation activates account  
3. Login returns:
   - Access token (10 min)
   - Refresh token cookie (30 days)
4. Refresh endpoint issues new access token
5. Logout clears refresh cookie
6. Password reset uses OTP → reset token → new password

---

## Design Principles

- Stateless access tokens  
- Secure refresh cookie rotation (planned v1.1)  
- Centralized error handling  
- Rate-limited auth endpoints  
- Environment-based configuration
