const db = require("../data/dbConfig.js");
const request = require("supertest");
const server = require("../api/server.js");

describe("test restricted arts-router", () => {
  const registerUser = {
    email: "me@me.com",
    password: "123",
  };
  const loginUser = {
    email: "me@me.com",
    password: "123",
  };
  let token;
  beforeEach(async () => {
    await db("users").truncate();
    request(server)
      .post("/api/auth/register")
      .send(registerUser)
      .then((res) => {
        console.log("register response -->", res.body);
      });
  });
  beforeEach((done) => {
    request(server)
      .post("/api/auth/login")
      .send(loginUser)
      .then((res) => {
        token = res.body.token;
        console.log("the response you're looking for -->", token);
        done();
      });
  });
  afterEach(async () => {
    await db("users").truncate();
  });
  beforeEach(async () => {
    await db("arts").truncate();
  });

  describe("private route [GET]", () => {
    it("returns 404", () => {
      return request(server)
        .get("/api/arts/1")
        .set("Authorization", token)
        .expect(404);
    });
    it("add art, should return 200", async () => {
      await db("arts").insert({
        art_name: "test",
        art_url: "test",
        rating: 5,
        category: "news",
        users_id: 1,
      });
      return request(server)
        .get("/api/arts/1")
        .set("Authorization", token)
        .expect(200);
    });
  });

  describe("private route [POST]", () => {
    it("add art, returns 201", () => {
      return request(server)
        .post("/api/arts/1")
        .send({
          art_name: "test",
          art_url: "test",
          rating: 5,
          category: "news",
        })
        .set("Authorization", token)
        .expect(201);
    });
  });

  describe("private route category [GET]", () => {
    it("no arts returns 404", async () => {
      return request(server)
        .get("/api/arts/category/1/music")
        .set("Authorization", token)
        .expect(404);
    });

    it("add arts and returns 200", async () => {
      await db("arts").insert({
        art_name: "test",
        art_url: "test",
        rating: 5,
        category: "music",
        users_id: 1,
      });
      await db("arts").insert({
        art_name: "test2",
        art_url: "test2",
        rating: 4,
        category: "music",
        users_id: 1,
      });
      await db("arts").insert({
        art_name: "test3",
        art_url: "test3",
        rating: 3,
        category: "news",
        users_id: 1,
      });
      return request(server)
        .get("/api/arts/category/1/music")
        .set("Authorization", token)
        .expect(200);
    });
  });

  describe("restricted route [PUT]", () => {
    it("add art, update with bad object and expect 500", async () => {
      await db("arts").insert({
        art_name: "test",
        art_url: "test",
        rating: 5,
        category: "music",
        users_id: 1,
      });
      return request(server)
        .put("/api/arts/1")
        .send({})
        .set("Authorization", token)
        .expect(500);
    });
    it("add art, update it and expect 200", async () => {
      await db("arts").insert({
        art_name: "test",
        art_url: "test",
        rating: 5,
        category: "music",
        users_id: 1,
      });
      return request(server)
        .put("/api/arts/1")
        .send({ art_name: "change" })
        .set("Authorization", token)
        .expect(200);
    });
  });

  describe("restricted route [DELETE]", () => {
    it("add art, delete that art, return shoulb be 200", async () => {
      await db("arts").insert({
        art_name: "test",
        art_url: "test",
        rating: 5,
        category: "music",
        users_id: 1,
      });
      return request(server)
        .delete("/api/arts/1")
        .set("Authorization", token)
        .expect(200)
        .expect("Content-Type", /json/);
    });
  });
});
