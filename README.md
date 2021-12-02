
# NC House of Games

An API for board game reviews.


Database tables include reviews, categories and comments. 


The hosted version of the API can be found here:

https://nc-games-2021-sj.herokuapp.com/api/
##  Links
[![netlify](https://img.shields.io/badge/NC_Games_Front_End_Hosted-000?color=blue&style=for-the-badge&logo=netlify&logoColor=white)](https://github.com/CoderJenks/nc-games.git)
[![github](https://img.shields.io/badge/NC_Games_Front_End_Repository-000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/CoderJenks/nc-games.git)

[![heroku](https://img.shields.io/badge/NC_Games_Back_End_Hosted-000?color=purple&style=for-the-badge&logo=heroku&logoColor=white)](https://github.com/CoderJenks/NC-House-of-Games-API.git)
[![github](https://img.shields.io/badge/NC_Games_Back_End_Repository-000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/CoderJenks/NC-House-of-Games-API.git)


## How to set up the project locally

#### How to clone
Firstly you will need to clone down the repository into a local directory.
In VSCode cd into your chosen location and use the following command in the terminal:

`git clone https://github.com/CoderJenks/NC-House-of-Games-API.git`

This will create copies of the repository files into a local git on your system.
Next cd into the directory using the terminal command:

`cd be-nc-games`



#### Install dependencies

This project uses the following dependencies which will need to be installed:
- [Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (minimum version 16.9.1)
- [Postgres pg](https://www.npmjs.com/package/pg) (minimum version 8.7.1) 
- [Postgres pg-format](https://www.npmjs.com/package/pg-format) (minimum version 1.0.4)
- [Dotenv](https://www.npmjs.com/package/dotenv) (minimum version 10.0.0) 
- [Express](https://www.npmjs.com/package/express) (minimum version 4.17.1) 
- [CORS package](https://expressjs.com/en/resources/middleware/cors.html) (minimum version 2.8.5)

For testing you will also need to install the following dev dependencies:
- [Jest](https://jestjs.io/docs/getting-started)
- [Jest Sorted](https://www.npmjs.com/package/jest-sorted)
- [Supertest](https://www.npmjs.com/package/supertest)



#### Create .env files
In the `be-nc-games` folder create 2 files named `.env.test` and `.env.development`.

For `.env.test` add the text `PGDATABASE=nc_games_test`.

For `.env.development.` add the text `PGDATABASE=nc_games`.



#### Seed local database
In the terminal type the command `npm run setup-dbs` to create local databases `nc_games` and `nc_games_test`.

Next type the command `npm run seed` to seed the databases.

**You should now have all dependencies installed and the database set up and seeded in order to run/test locally**

#### Run tests

In the terminal type the command `npm test app.test.js` to run the jest tests for all endpoints.


## API Reference

#### Get all categories

```http
GET /api/categories
```

Responds with an array of category objects
#### Get all reviews

```http
GET /api/reviews
```
Responds with an array of review objects with the following properties:
- `owner`
- `title`
- `review_id`
- `category`
- `review_img_url`
- `created_at`
- `votes`
- `comment_count`


Accepts the following queries:
- 'sort_by', which sorts the reviews by any valid column (defaults to date)
- 'order', which can be set to asc or desc for ascending or descending (defaults to descending)
- 'category', which filters the reviews by the category value specified in the query


#### Get review

```http
GET /api/reviews/${review_id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `review_id`      | `number` | **Required**. Id of review to fetch |


Responds with a review object with the following properties:
- `owner`
- `title`
- `review_id`
- `review_body`
- `designer`
- `review_img_url`
- `category`
- `created_at`
- `votes`
- `comment_count`

#### Patch a reviews vote count

```http
PATCH /api/reviews/${review_id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `review_id`      | `number` | **Required**. Id of review to fetch |
| `{inc_votes: newVote}` | `object` | **Required**. newVote is a number that will be added to the existing votes for the review |

 Responds with a review object with an updated `inc_votes` value.    


#### Get all comments for a review

```http
GET /api/reviews/${review_id}/comments
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `review_id`      | `number` | **Required**. Id of review to fetch |

Responds with an array of comments for the given 'review_id'.

Each comment in the array has the following properties:
- `comment_id`
- `votes`
- `created_at`
- `author`
- `body`


#### Post a new comment for a review

```http
POST /api/reviews/${review_id/comments
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `review_id`      | `number` | **Required**. Id of review being commented on |
| `{body: "body string", author: "author string"}`      | `object` | **Required**. Body is the text of the comment being submitted, author of comment being created |


Responds with a newly created comment for the given 'review_id' which contains the following properties:
- `comment_id`
- `votes`
- `created_at`
- `author`
- `body`

#### Delete a comment

```http
DELETE /api/comments/{comment_id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `comment_id`      | `number` | **Required**. Id of comment being removed |
