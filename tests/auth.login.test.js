import request from "supertest";
import { describe, it, expect } from "@jest/globals";
import { app } from "../server.js";

describe("POST /api/auth/login", () => {
  //Missing credentials
  it("should fail with missing fields", async () => {
    const res = await request(app).post("/api/auth/login").send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  //Missing password
  it("should return 400 if password is missing", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "testuser@example.com" });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  //Wrong email
  it("should fail if user does not exist", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "nouser@example.com",
      password: "Password123!",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  //Wrong Password
  it("should fail if password is wrong", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "chromaticartison@gmail.com",
      password: "Password123!",
    });

    expect(res.statusCode).toBe(403);
    expect(res.body.success).toBe(false);
  });

  //unverified email should not give tokens back
  it("should fail if email is unverified", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "ali123@gmail.com", //add unverified mail from db
      password: "3490000aA@", //password must be correct according to architecture design
    });
    // console.log(res.body);

    expect(res.body.accessToken).toBeNull();
    expect(res.statusCode).toBe(200);
  });

  //Successful Login
  it("should login successfully with valid credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "chromaticartison@gmail.com",
      password: "3490000aA@",
    });

    // status
    expect(res.statusCode).toBe(200);

    // success flag
    expect(res.body.success).toBe(true);

    // access token in body
    expect(res.body).toHaveProperty("accessToken");

    // user object checks
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("id");
    expect(res.body.user).toHaveProperty("email");
    expect(res.body.user).toHaveProperty("username");

    // refresh token should exist as cookie
    const cookies = res.headers["set-cookie"];

    expect(cookies).toBeDefined();
    expect(cookies.some((c) => c.includes("refreshToken"))).toBe(true);
  });

  // rate limiting / abuse protection
  it("should block after too many attempts", async () => {
    for (let i = 0; i < 5; i++) {
      await request(app).post("/api/auth/login").send({
        email: "login_test@example.com",
        password: "WrongPassword!",
      });
    }

    const res = await request(app).post("/api/auth/login").send({
      email: "login_test@example.com",
      password: "WrongPassword!",
    });
    expect([429, 401]).toContain(res.statusCode);
  });
});
