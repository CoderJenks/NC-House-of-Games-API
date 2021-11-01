const request = require("supertest");
const app = require("../app.js")

const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const { seed } = require('../db/seeds/seed.js');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/categories", () => {
    testData("status 200, responds with an array of games", () => {
        return request(app)
        .get("/api/games")
        .expect(200)
        .then(({body}) => {
            expect(body.catergories.length).toBe(4);
        })
    })
})