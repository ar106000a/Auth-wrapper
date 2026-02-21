# API Endpoints Documentation

## LOGIN_ENDPOINT

- **Method:** POST
- **URL:** `/auth/login`
- **Auth Required:** NO

### Request Body

```json
{
  "email": "string",
  "password": "string"
}
```

### Success Response

```json
{
  "user": {
    "id": "string",
    "email": "string",
    "username": "string"
  },
  "accessToken": "string",
  "success": true
}
```

### Rejected Response

```json
{
  "error": "string",
  "error_info": {
    "error_code": "string",
    "error_message": "string",
    "error_details": {}
  },
  "success": false
}
```

---

## REGISTER_ENDPOINT

- **Method:** POST
- **URL:** `/auth/register`
- **Auth Required:** NO

### Request Body

```json
{
  "email": "string",
  "password": "string",
  "username": "string"
}
```

### Success Response:

```json
{
  "message": "string",
  "user": {
    "id": "string",
    "email": "string",
    "username": "string"
  },
  "success": true
}
```

### Rejected Response:

```json
{
  "error": "string",
  "error_info": {
    "error_code": "string",
    "error_message": "string",
    "error_details": {}
  },
  "success": false
}
```

## CONFIRM_EMAIL ENDPOINT:

- **Method:** POST
- **URL:** `/auth/confirm_email`
- **Auth:** NO

### Request Body:

```json
{
  "id": "string",
  "otp": "string"
}
```

### Success Response On LOGIN FLOW:

```json
{
  "message": "string",
  "success": true,
  "deleteFlag": "string"
}
```

### Success Response On DASHBOARD FLOW:

```json
{
  "user": {
    "id": "string",
    "email": "string",
    "username": "string"
  },
  "accessToken": "string",
  "success": true,
  "message": "string",
  "deleteFlag": "string"
}
```

### Rejected response:

```json
{
  "error": "string",
  "error_info": {
    "error_code": "string",
    "error_message": "string",
    "error_details": {}
  },
  "success": false
}
```

## USERNAME_CHECKING ENDPOINT:

- **Method:** POST
- **URL:** `/auth/username`
- **Auth:** NO

### Request Body:

```json
{
  "email": "string",
  "username": "string"
}
```

### Success Response:

```json
{
  "isAvailable": "true/false",
  "success": true,
  "message": "string"
}
```

### Rejected response:

```json
{
  "error": "string",
  "error_info": {
    "error_code": "string",
    "error_message": "string",
    "error_details": {}
  },
  "success": false
}
```

## LOGOUT ENDPOINT:

- **Method:** POST
- **URL:** `/auth/logout`
- **Auth:** YES

### Request Body:

**Only request headers use**

### Success Response:

```json
{
  "success": true,
  "message": "string",
  "timeStamp": "Date.ISO"
}
```

### Rejected response:

```json
{
  "error": "string",
  "error_info": {
    "error_code": "string",
    "error_message": "string",
    "error_details": {}
  },
  "success": false
}
```

## REFRESH ENDPOINT:

- **Method:** POST
- **URL:** `/auth/refresh`
- **Auth:** Partial(refreshToken req only)

### Request Body:

**Only request cookies being used**

### Success Response:

```json
{
  "user": {
    "id": "string",
    "email": "string",
    "username": "string"
  },
  "accessToken": "AccessToken",
  "success": true,
  "message": "string"
}
```

### Rejected response:

```json
{
  "error": "string",
  "error_info": {
    "error_code": "string",
    "error_message": "string",
    "error_details": {}
  },
  "success": false
}
```

## RESETTING_PASSWORD ENDPOINT:

- **Method:** POST
- **URL:** `/auth/password/reset`
- **Auth:** NO(a reset token(in http only cookie) guards this although)

### Request Body:

```json
{
  "email": "string",
  "password": "string"
}
```

### Success Response:

```json
{
  "success": true,
  "message": "string"
}
```

### Rejected response:

```json
{
  "error": "string",
  "error_info": {
    "error_code": "string",
    "error_message": "string",
    "error_details": {}
  },
  "success": false
}
```

## SENDING_OTP_FOR_RESETTING_PASSWORD ENDPOINT:

- **Method:** POST
- **URL:** `/auth/password/otp`
- **Auth:** NO

### Request Body:

```json
{
  "email": "string",
  "purpose": "Password reset"
}
```

### Success Response:

```json
{
  "message": "string",
  "success": true
}
```

### Rejected response:

```json
{
  "error": "string",
  "error_info": {
    "error_code": "string",
    "error_message": "string",
    "error_details": {}
  },
  "success": false
}
```

## CONFIRM_OTP_FOR_RESETTING_PASSWORD ENDPOINT:

- **Method:** POST
- **URL:** `/auth/password/verify`
- **Auth:** NO

### Request Body:

```json
{
  "email": "string",
  "otp": "int"
}
```

### Success Response:

```json
{
  "success": true,
  "message": "string",
  "deleteFlag": "string"
}
```

### Rejected response:

```json
{
  "error": "string",
  "error_info": {
    "error_code": "string",
    "error_message": "string",
    "error_details": {}
  },
  "success": false
}
```
