const db = require('../connection.js');
const { dropTable } = require('../../utils/utils.js');

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

  return dropTable('users')
  .then( () => dropTable('categories'))
  .then( () => dropTable('reviews'))
  .then( () => dropTable('comments'))
  .then( () => {
    const userTableSetupStr = `CREATE TABLE users (
    username VARCHAR(255) NOT NULL PRIMARY KEY,
    name VARCHAR NOT NULL,
    avatar_url TEXT
    );`
  
    return db.query(userTableSetupStr)
    .then(() => {
    console.log("Table created: users")
    });

  })
  .then( () => {
    const categoriesTableSetupStr = `CREATE TABLE categories (
    slug VARCHAR(255) NOT NULL PRIMARY KEY,
    description VARCHAR NOT NULL
    );`
  
    return db.query(categoriesTableSetupStr)
    .then(() => {
    console.log("Table created: categories")
    });
  })

  // 2. insert data
};

module.exports = seed;
