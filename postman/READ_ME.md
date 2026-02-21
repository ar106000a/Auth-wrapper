# Postman Collection — Authentication API

This folder contains the Postman collection used to test the full authentication flow
of the backend.

It allows developers to quickly verify that all authentication endpoints are working without building a frontend.

## Contents

- ""Auth.postman_collection.json""

## Complete set of requests covering the authentication lifecycle:

- Register

- Email confirmation (OTP)

- Login

- Refresh access token

- Access protected route

- Logout

- Password reset (OTP → reset token → new password)

- Username availability check

- Health check

## Prerequisites

- **Before using the collection:**

Backend server must be running locally.

Required environment variables must be configured in the backend .env.

Cookies must be enabled in Postman (needed for refresh token flow).

- **Default local server:**

  http://localhost:5000

## How to Use

- Open Postman.

- Click Import.

- Import auth.postman_collection.json.

- Ensure the backend server is running.

- Execute requests in logical order(request/response bodies are given in the docs/API_CONTRACT.md):

Register

Confirm email (OTP)

Login

Refresh token

Access protected route

Logout

Password reset flow (optional)

Get Profile route(This route can be tested only after login. Login will give you a valid access token, which you ll store in the Authorization header after 'bearer'.)

## Notes

    No sensitive credentials are stored in this collection.

    All secrets are managed securely via the backend .env.

    The collection is intended for local development and verification.

    Production testing should use a separate environment and secure credentials.

## Purpose

This Postman collection serves as:

- A manual integration testing tool

- A reference for API usage

- A quick verification suite after deployment

- It ensures the authentication system remains stable, testable, and developer-friendly.
