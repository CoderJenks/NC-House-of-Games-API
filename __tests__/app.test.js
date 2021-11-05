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
    test("status: 400, invalid review_id responds with error message 'Invalid query'", () => {
        return request(app)
        .get("/api/reviews/dog")
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Invalid query");
        });
    })
    test("status: 404, when provided with a valid review_id with no review", () => {
        return request(app)
        .get("/api/reviews/9999")
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("9999 not found");
        });
    })
});

describe("PATCH /api/reviews/:review_id", () => {
    test("status: 200, responds with a review object for a specific review_id", () => {
        const review_id = 3;
        const voteChange = {
             inc_votes : 1
            };
        const expectedOutput = {
            review_id: 3,
            title: 'Ultimate Werewolf',
            designer: 'Akihisa Okui',
            owner: 'bainesface',
            review_img_url:
              'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
            review_body: "We couldn't find the werewolf!",
            category: 'social deduction',
            created_at: new Date(1610964101251).toISOString(),
            votes: 6,
            comment_count: 3
          }
        
        return request(app)
        .patch(`/api/reviews/${review_id}`)
        .send(voteChange)
        .expect(200)
        .then(({body}) => {
            expect(body.review.review_id).toBe(review_id);
            expect(body.review.votes).toBe(6);
            expect(body.review).toEqual(expectedOutput)
        });
    });
    test("status: 400, invalid review_id responds with error message 'Invalid query'", () => {
        const voteChange = {
            inc_votes : 1
           };
        return request(app)
        .patch("/api/reviews/dog")
        .send(voteChange)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Invalid query");
        });
    })
    test("status: 404, when provided with a valid review_id with no review", () => {
        const voteChange = {
            inc_votes : 1
           };
        return request(app)
        .patch("/api/reviews/9999")
        .send(voteChange)
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("9999 not found");
        });
    })
    test("status: 200, allows negative votes if votes don't reduce below zero", () => {
        const review_id = 3;
        const voteChange = {
            inc_votes : -1
           };
        return request(app)
        .patch(`/api/reviews/${review_id}`)
        .send(voteChange)
        .expect(200)
        .then(({body}) => {
            expect(body.review.votes).toBe(4);
        });
    })
    test("status: 400, returns error when inc_votes would reduce votes below zero", () => {
        const review_id = 3;
        const voteChange = {
            inc_votes : -10
           };
        return request(app)
        .patch(`/api/reviews/${review_id}`)
        .send(voteChange)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Change would result in invalid value");
        });
    })
    test("status: 400, returns error when inc_votes is invalid", () => {
        const review_id = 3;
        const voteChange = {
            inc_votes : "cat"
           };
        return request(app)
        .patch(`/api/reviews/${review_id}`)
        .send(voteChange)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Invalid query");
        });
    })
    test("status: 400, rejects object with invalid key pair", () => {
        const review_id = 3;
        const voteChange = {
            inc_votes : 1,
            name: 'Mitch'
           };
        return request(app)
        .patch(`/api/reviews/${review_id}`)
        .send(voteChange)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Invalid query");
        });
    })
})

describe("GET /api/reviews", () => {
    test("status: 200, responds with an array of reviews", () => {
        return request(app)
        .get("/api/reviews")
        .expect(200)
        .then(({body}) => {
            expect(body.reviews.length).toBe(13);
            body.reviews.forEach((review) => {
                expect(review).toEqual(
                    expect.objectContaining({
                        owner: expect.any(String),
                        title: expect.any(String),
                        review_id: expect.any(Number),
                        category: expect.any(String),
                        review_img_url: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        comment_count: expect.any(Number)
                    })

                )

            })
        })
    })
    test("status: 200, reviews are sorted by descending date by default", () => {
        return request(app)
        .get("/api/reviews")
        .expect(200)
        .then(({body}) => {
            expect(body.reviews).toBeSortedBy("created_at",{ descending: true });
        })
    })
    test("status: 200, accepts a sort_by query", () => {
        return request(app)
        .get("/api/reviews?sort_by=owner")
        .expect(200)
        .then(({body}) => {
            expect(body.reviews).toBeSortedBy("owner",{ descending: true });
        })
    })
    test("status: 400, responds with error message for invalid sort_by query", () => {
        return request(app)
        .get("/api/reviews?sort_by=not_a_column")
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Invalid sort_by query");
        })
    })
    test("status: 200, accepts order query", () => {
        return request(app)
        .get("/api/reviews?order=asc")
        .expect(200)
        .then(({body}) => {
            expect(body.reviews).toBeSortedBy("created_at",{ ascending: true });
        })
    })
    test("status: 400, responds with error message for invalid order query", () => {
        return request(app)
        .get("/api/reviews?order=order")
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Invalid order query");
        })
    })
    test("status: 200, accepts both a query with both sort_by and order", () => {
        return request(app)
        .get("/api/reviews?sort_by=category&order=asc")
        .expect(200)
        .then(({body}) => {
            expect(body.reviews).toBeSortedBy("category",{ ascending: true });
        })
    })
    test("status: 200, returns reviews for a specified category ", () => {
        const expectedOutput = [{
            review_id: 2,
            title: 'Jenga',
            designer: 'Leslie Scott',
            owner: 'philippaclaire9',
            review_img_url:
              'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
            review_body: 'Fiddly fun for all the family',
            category: 'dexterity',
            created_at: new Date(1610964101251).toISOString(),
            votes: 5,
            comment_count: 3
          }];

        return request(app)
        .get("/api/reviews?category=dexterity")
        .expect(200)
        .then(({body}) => {
            expect(body.reviews).toEqual(expectedOutput);
        })
    })
    test("status: 400, responds with error message for invalid order query", () => {
        return request(app)
        .get("/api/reviews?category=NotACategory")
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Invalid category query");
        })
    })
})

