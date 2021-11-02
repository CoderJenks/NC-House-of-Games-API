# TO-DO

## Setup
- Set up .env files. **DONE**
- Install dependencies. **DONE**

    #### Dependencies
    - dotenv
    - express
    - pg
    - pg-format

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
    - status: 500 {msg: "server error"}
    - status: 404 {msg: "path not found"}


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
    - status: 500 {msg: "server error"}
    - status: 404 {msg: "path not found"}
    





