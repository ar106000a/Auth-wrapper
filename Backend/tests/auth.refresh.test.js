import request from "supertest";
import { describe, it, expect } from "@jest/globals";
import { app } from "../server.js";

describe("POST /api/auth/refresh", () => {
  //fail if no refresh token is present
  it("should fail without refresh token available", async () => {
    const res = await request(app).post("/api/auth/refresh").send({});
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  //successful refresh
  it("should give user and access token", async () => {
    //getting the refresh token from login first and then passing that on to the refresh endpoint

    const loginRes = await request(app).post("/api/auth/login").send({
      email: "chromaticartison@gmail.com",
      password: "3490000aA@",
    });
    const cookie = loginRes.headers["set-cookie"];
    const res = await request(app)
      .post("/api/auth/refresh")
      .set("Cookie", cookie)
      .send({});

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
  //tampered refresh token
  it("should fail given a tampered refresh token", async () => {
    //getting the refresh token from login first and then passing that on to the refresh endpoint

    const loginRes = await request(app).post("/api/auth/login").send({
      email: "chromaticartison@gmail.com",
      password: "3490000aA@",
    });
    let cookie = loginRes.headers["set-cookie"];
    cookie = cookie[0].replace("eyJ", "xxx");
    const res = await request(app)
      .post("/api/auth/refresh")
      .set("Cookie", cookie)
      .send({});

    expect(res.statusCode).toBe(403);
    expect(res.body.success).toBe(false);
  });
});
