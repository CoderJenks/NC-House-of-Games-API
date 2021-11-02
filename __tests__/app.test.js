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
            expect(body.review.review_id).toBe(review_id);
        });
    });
    test("status: 200, review object has required properties including owner and comment_count", () => {
        const review_id = 2;
        const expectedCreated_At = new Date(1610964101251).toISOString();
        
        const expectedResponse = {
            review_id: 2,
            title: 'Jenga',
            designer: 'Leslie Scott',
            owner: 'philippaclaire9',
            review_img_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
            review_body: 'Fiddly fun for all the family',
            category: 'dexterity',
            created_at: expectedCreated_At, 
            votes: 5,
            comment_count: 3
          };

        return request(app)
        .get(`/api/reviews/${review_id}`)
        .expect(200)
        .then(({body}) => {
            expect(body.review.review_id).toBe(expectedResponse.review_id);
            expect(body.review.title).toBe(expectedResponse.title);
            expect(body.review.designer).toBe(expectedResponse.designer);
            expect(body.review.owner).toBe(expectedResponse.owner);
            expect(body.review.review_img_url).toBe(expectedResponse.review_img_url);
            expect(body.review.review_body).toBe(expectedResponse.review_body);
            expect(body.review.category).toBe(expectedResponse.category);
            expect(body.review.created_at).toBe(expectedResponse.created_at);
            expect(body.review.votes).toBe(expectedResponse.votes);
            expect(body.review.comment_count).toBe(expectedResponse.comment_count)
            })
    });
});