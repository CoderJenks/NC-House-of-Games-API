# TO-DO

## Setup
- Set up .env files. **DONE**
- Install dependencies. **DONE**

    #### Dependencies
    - Node.js (minimum version 16.9.1)
    - Dotenv (minimum version 10.0.0)
    - Express (minimum version 4.17.1)
    - Postgres pg (minimum version 8.7.1)
    - Postgres pg-format (minimum version 1.0.4)
    - cors (minimum version 2.8.5),

    #### devDependencies
    - jest
    - jest sorted (add to Jest setupFilesAfterEnv configuration)
    - supertest


- npm run setup-dbs. **DONE**

## Seeding
- Drop tables if exist. **DONE**
- Create tables (Users -> Categories -> Reviews -> Comments). **DONE**
- Insert data into tables. **DONE**

## Building Endpoints
- Create folders for routes, controllers and models. **DONE**
- Create `app.js` file and `api.router.js`. **DONE**
- require `app` and `supertest` in `app.test.js`.
- set up testing and build endpoints using TDD and error handling.


### **GET** `/api/categories`
    Create an endpoint which responds with an array of category objects.
    - it should include the `slug` and `description` properties.

    ERRORS
    Happy Path
    - status: 200 {"categories": {,},....,{,}} DONE

    Sad Path
    - status: 500 {msg: "server error"} DONE
    - status: 404 {msg: "path not found"} DONE


### **GET** `/api/reviews/:review_id`
    Responds with a review object with the following properties:
    - `owner` which is the `username` from the users table
    - `title`
    - `review_id`
    - `review_body`
    - `designer`
    - `review_img_url`
    - `category`
    - `created_at`
    - `votes`
    - `comment_count` which is the total count of all the comments with this `review_id` - you should make use of queries to the database in order to achieve this


    ERRORS
    Happy Path
    - status: 200 {"review": {,},....,{,}} DONE

    Sad Path
    - status: 500 {msg: "server error"} DONE
    - status: 404 {msg: "path not found"} DONE
    - status: 400 {msg: "Invalid query"} - invalid review_id DONE
    - status: 404 {msg: "review not found"} - valid review_id but no review DONE
    

### **PATCH** `/api/reviews/:review_id`
    - Updates the review.
    - Accepts an object in the form { inc_votes: newVote } where newVote is a number that will be added to the existing votes in the existing review. 
    - Responds with a review object with the updated review.

    ERRORS
    Happy Path
    - status: 200 review updated DONE
    - status: 200 review updated with negative inc_votes DONE

    Sad Path
    - status: 500 {msg: "server error"} DONE
    - status: 404 {msg: "path not found"} DONE
    - status: 400 {msg: "Invalid query"} - invalid review_id. DONE
    - status: 404 {msg: "review not found"} - valid review_id but no review. DONE
    - status: 400 {msg: "change would result in invalid value"} - rejects as change would result in votes being a negative value. DONE
    - status: 400 {msg: "Invalid query"} - rejects invalid inc_votes. DONE
    - status: 400 {msg: "Invalid query"} - rejects object with invalid key pairs. DONE
    - status: 200 ignores patch request with empty body and returns unchanged review DONE
    

### **GET** `/api/reviews/`
    Responds with an array of review objects with the following properties:
    - `owner` which is the `username` from the users table
    - `title`
    - `review_id`
    - `category`
    - `review_img_url`
    - `created_at`
    - `votes`
    - `comment_count` which is the total count of all the comments with this `review_id` - you should make use of queries to the database in order to achieve this

    Task doesn't mention the properties:
    - `review_body`
    - `designer`

    Should accept queries:
    - 'sort_by', which sorts the reviews by any valid column (defaults to date)
    -'order', which can be set to asc or desc for ascending or descending (defaults to descending)
    'category', which filters the reviews by the category value specified in the query



    ERRORS
    Happy Path
    - status: 200 {"reviews": {,},....,{,}} DONE
    - status: 200 - accepts a sort_by query DONE
    - status: 200 - accepts an order query DONE
    - status: 200 - accepts a query with both sort_by and order DONE
    - status: 200 - accepts a category query which filters results by the category DONE
    - status: 200 - category exists but has no reviews.  Returns an empty array DONE

    Sad Path
    - status: 500 {msg: "server error"}
    - status: 404 {msg: "path not found"} DONE
    - status: 400 {msg: "Invalid sort_by query"} - column doesn't exist DONE
    - status: 400 {msg: "Invalid order query"} - order isn't "asc" or "desc" DONE
    - status: 400 {msg: "Value not found"} - category doesn't exist DONE


### **GET** `/api/reviews/:review_id/comments`
    Responds with an array of comments for the given 'review_id' of which each comment should have the following properties:
    - `comment_id`
    - `votes`
    - `created_at`
    - `author` which is the username from the users table
    - `body`


    ERRORS
    Happy Path
    - status: 200 {"comments": {,},....,{,}} DONE
    - status: 200 - review exists but has no comments. Returns an empty array
   
    Sad Path
    - status: 500 {msg: "server error"}
    - status: 404 {msg: "path not found"} DONE
    - status: 400 {msg: "Invalid query"} - invalid review_id. DONE
    - status: 404 {msg: "review not found"} - valid review_id but no review. DONE

### **POST** `/api/reviews/:review_id/comments`
    Responds with a newly created comment for the given 'review_id' which contains the following properties:
    - `comment_id`
    - `votes`
    - `created_at`
    - `author` which is the username from the users table
    - `body`
    where author and body matches inputted values.
    
    Accepts an object in the form {body: "body string", author: "author string"}; 


    ERRORS
    Happy Path
    - status: 201 {"comments": {,},....,{,}} DONE

### **DELETE** `/api/comments/:comment_id`
    Removes a comment with the given 'comment_id'.

    ERRORS
    Happy Path
    - status: 204 DONE
    









