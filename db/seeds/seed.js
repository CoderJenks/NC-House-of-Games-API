const db = require("../connection.js");
const { dropTable } = require("../../utils/utils.js");
const format = require("pg-format")

const seed = (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  // 1. create tables

  // Order of tables:
  //  Categories - not reliant on other tables
  //  Comments - requires an author which is linked to users.username
  //    and a review_id which is linked to reviews.review_id.
  //  Reviews - requires an owner which is linked to users.username
  //    and a category which is linked to categories.slug
  //  Users - not reliant on other tables
  //  *Create tables and insert data in the following order:
  //  Users -> Categories -> Reviews -> Comments

  return dropTable('comments')
  .then( () => dropTable('reviews'))
  .then( () => dropTable('categories'))
  .then( () => dropTable('users'))
  .then( () => {
    const usersTableSetupStr = `CREATE TABLE users (
    username VARCHAR NOT NULL PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    avatar_url VARCHAR
    );`
  
    return db.query(usersTableSetupStr)
    .then(() => {
    console.log("Table created: users")
    });

  })
  .then( () => {
    const categoriesTableSetupStr = `CREATE TABLE categories (
    slug VARCHAR(40) NOT NULL PRIMARY KEY,
    description VARCHAR NOT NULL
    );`
  
    return db.query(categoriesTableSetupStr)
    .then(() => {
    console.log("Table created: categories")
    });
  })
  .then( () => {
    const reviewsTableSetupStr = `CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    designer VARCHAR(40) NOT NULL,
    owner VARCHAR NOT NULL,
    FOREIGN KEY (owner) REFERENCES users(username) ON DELETE CASCADE,
    review_img_url VARCHAR DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
    review_body VARCHAR NOT NULL,
    category VARCHAR NOT NULL,
    FOREIGN KEY (category) REFERENCES categories(slug) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    votes INT DEFAULT 0
    );`
  
    return db.query(reviewsTableSetupStr)
    .then(() => {
    console.log("Table created: reviews")
    });
  })
  .then( () => {
    const commentsTableSetupStr = `CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    body VARCHAR NOT NULL,
    votes INT DEFAULT 0,
    author VARCHAR NOT NULL REFERENCES users(username) ON DELETE CASCADE,
    review_id INT NOT NULL REFERENCES reviews(review_id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(0)
    );`
  
    return db.query(commentsTableSetupStr)
    .then(() => {
    console.log("Table created: comments")
    });
  })
  

  // 2. insert data
  // categoryData, commentData, reviewData, userData
  
  .then( () => {
    const usersTableInsertDataStr = format(
      `INSERT INTO users (username, name, avatar_url) VALUES %L RETURNING *;`,
      userData.map((user) => {
        return [user.username, user.name, user.avatar_url]
      }))
  
    return db.query(usersTableInsertDataStr)
    .then(() => {
    console.log("Table data inserted: users")
    });
  })

  .then( () => {
    const categoriesTableInsertDataStr = format(
      `INSERT INTO categories (slug, description) VALUES %L RETURNING *;`,
      categoryData.map((category) => {
        return [category.slug, category.description]
      }))
  
    return db.query(categoriesTableInsertDataStr)
    .then(() => {
    console.log("Table data inserted: categories");
    });
  })

  .then( () => {
    const reviewsTableInsertDataStr = format(
      `INSERT INTO reviews (title, designer, owner, review_img_url, review_body, category, created_at, votes) VALUES %L RETURNING *;`,
      reviewData.map((review) => {
        return [review.title, review.designer, review.owner, review.review_img_url, review.review_body, review.category, review.created_at, review.votes]
      }))
  
    return db.query(reviewsTableInsertDataStr)
    .then(() => {
    console.log("Table data inserted: reviews");
    });
  })

  // .then( () => {
  //   const reviewsTableInsertDataStr = format(
  //     `INSERT INTO reviews (title, designer, owner, review_img_url, review_body, category, created_at, votes) VALUES %L RETURNING *;`,
  //     reviewData.map((review) => {
  //       return [review.title, review.designer, review.owner, review.review_img_url, review.review_body, review.category, review.created_at, review.votes]
  //     }))
  
  //   return db.query(reviewsTableInsertDataStr)
  //   .then(({ rows }) => {
  //   console.log("Table data added: reviews");
  //   console.log(rows);
  //   });
  // })


};

module.exports = seed;
