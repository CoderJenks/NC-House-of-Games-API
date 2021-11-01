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
- set up testing and build endpoints using TDD.


    ### **GET** `/api/categories`
    Create an endpoint which responds with an array of category objects.
    - it should include the `slug` and `description` properties.

    ERRORS
    Happy Path
    - status: 200 {"categories": {,},....,{,}}
    





