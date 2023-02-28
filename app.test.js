import supertest from "supertest";
import app from "./app";

// Test the root path
describe("GET /", () => {
  it("should return 200 OK", () => {
    return supertest(app).get("/").expect(200);
  });
});

// Test the users path
describe("Users", () => {
  it("should create a new user", () => {
    return supertest(app)
      .post("/users")
      .send({ name: "Netson Cavina" })
      .expect(201)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.name).toBe("Netson Cavina");
      });
  });
  it("should an array of users", () => {
    return supertest(app)
      .get("/users")
      .expect(200)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
      });
  });
  it("should return a user with especific id ", () => {
    return supertest(app)
      .get("/users/1")
      .expect(200)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.id).toBe(1);
      });
  });
  it("should return a user with especific name ", () => {
    return supertest(app)
      .get("/users?name=Netson Cavina")
      .expect(200)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0].name).toBe("Netson Cavina");
      });
  });
  it("should update a user with especific id ", () => {
    return supertest(app)
      .put("/users/1")
      .send({ name: "Netson Cavina" })
      .expect(200)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.name).toBe("Netson Cavina");
      });
  });
  it("should delete a user with especific id ", () => {
    return supertest(app)
      .delete("/users/1")
      .expect(200)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toEqual({});
      });
  });
});
