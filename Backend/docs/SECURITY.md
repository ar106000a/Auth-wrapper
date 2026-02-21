# Security Design

## Core Protections

### Authentication
- JWT access tokens (short-lived)
- Refresh tokens stored in HTTP-only cookies
- Session max age enforced

### Password Safety
- Password hashing with bcrypt
- Reset via OTP + reset token
- Tokens invalidated on password change

### Abuse Protection
- Rate limiting on auth routes
- Username/email validation
- OTP expiration and deletion

### API Safety
- Centralized error handler
- No sensitive data in tokens
- Secure cookie flags in production
- Helmet security headers 

---

## Planned Security Improvements (v1.1)

- Refresh token rotation
- Token blacklist on logout
- Audit logging
- Email verification expiry window
