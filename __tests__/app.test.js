const request = require("supertest");
const app = require("../app.js")

const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/categories", () => {
    test("status 200, responds with an array of games", () => {
        return request(app)
        .get("/api/categories")
        .expect(200)
        .then(({body}) => {
            expect(body.categories.length).toBe(4);
        })
    })
})