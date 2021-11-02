const request = require("supertest");
const app = require("../app.js");

const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /not-a-route", () => {
    test("status: 404, responds with error message 'path not found'", () => {
        return request(app)
        .get("/not-a-route")
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("Path not found");
        });
    });
});

describe("GET /api/categories", () => {
    test("status: 200, responds with an array of games", () => {
        return request(app)
        .get("/api/categories")
        .expect(200)
        .then(({body}) => {
            expect(body.categories.length).toBe(4);
            body.categories.forEach((category) => {
                expect(category).toEqual(
                    expect.objectContaining({
                        slug: expect.any(String),
                        description: expect.any(String)
                    })
                )
            });
        });
    });
});