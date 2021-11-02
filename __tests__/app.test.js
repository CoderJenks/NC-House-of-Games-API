const request = require("supertest");
const app = require("../app.js");

const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /not-a-route", () => {
    test("status: 404, responds with error message 'Path not found'", () => {
        return request(app)
        .get("/not-a-route")
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("Path not found");
        });
    });
});

describe("GET /api/categories", () => {
    test("status: 200, responds with an array of categories", () => {
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

describe("GET /api/reviews/:review_id", () => {
    test("status: 200, responds with a review object for a specific review_id", () => {
        const review_id = 1
        
        return request(app)
        .get(`/api/reviews/${review_id}`)
        .expect(200)
        .then(({body}) => {
            console.log(body.review)
            expect(body.review.length).toBe(10);
            expect(body.review).toEqual(
                expect.objectContaining({
                    review_id: expect.any(Number),
                    title: expect.any(String),
                    designer: expect.any(String),
                    owner: expect.any(String),
                    review_img_url: expect.any(String),
                    review_body: expect.any(String),
                    category: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    comment_count: expect.any(Number)
                })
            )
        });
    });
});