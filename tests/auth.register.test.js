import { describe, it, expect } from "@jest/globals";
import request from "supertest";
import app from "../server.js";

describe("POST /api/auth/register", () => {
  //missing username
  it("Should fail if username is empty", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "ali123@gmail.com",
      password: "ali123456",
    });
    expect(res.statusCode).toBe(400);
  });

  //missing password
  it("Should fail if password is empty", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "ali123@gmail.com",
      username: "ali123456",
    });
    expect(res.statusCode).toBe(400);
  });

  //missing email
  it("Should fail if email is empty", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "ali123@gmail.com",
      password: "ali123456",
    });
    expect(res.statusCode).toBe(400);
  });

  //password less than 8 characters
  it("Should fail if password is less than 8 characters", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "ali123@gmail.com",
      password: "ali",
      email: "ali123@gmail.com",
    });
    expect(res.statusCode).toBe(400);
  });

  //unavailable username
  it("Should fail if username is taken", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "weeeee",
      password: "ali123456",
      email: "chromaticartison@gmail.com",
    });
    expect(res.statusCode).toBe(403);
  });

  //verified email re-registring
  it("Should fail if username is taken", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "weeeeeee",
      password: "ali123456",
      email: "chromaticartison@gmail.com",
    });
    expect(res.statusCode).toBe(400);
  });

  //unverified email(already present in the db) gets confirm mail token on reregistring
  it("Should contain confirm email token", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "weeeee",
      password: "ali123456",
      email: "ali123@gmail.com",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty("user");
    const cookies = res.headers["set-cookie"];
    expect(cookies).toBeDefined();
    expect(cookies.some((c) => c.includes("confirmEmailToken"))).toBe(true);
  });

  //new email(not in the db already) should also get confirm email token
  it("should get the confirm email token", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "newEmail@gmail.com",
      password: "ali123456",
      username: "brandnewusername",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty("user");
    const cookies = res.headers["set-cookie"];
    expect(cookies).toBeDefined();
    expect(cookies.some((c) => c.includes("confirmEmailToken"))).toBe(true);
  });
});
