import supertest from "supertest";
import app from "./app";
import { describe } from "yargs";

// Server tests
describe("GET /", () => {
  it("should return 200 OK", () => {
    return supertest(app).get("/").expect(200);
  });
});
