const { forEach } = require('methods');
const db = require('../db/connection.js');

exports.selectReviewById = (review_id) => {
    return db.query(`
    SELECT reviews.*, COUNT(comments) AS comment_count
    FROM reviews
    LEFT JOIN comments ON reviews.review_id = comments.review_id 
    WHERE reviews.review_id = $1
    GROUP BY reviews.review_id`,
    [review_id]
    )
    .then(({rows}) => {
        if(rows.length !== 0) {
            rows[0]['comment_count'] = Number(rows[0]['comment_count']);
            return rows[0];
        } else {
            return Promise.reject({status: 404, msg: `${review_id} not found`})
        }
    })
};

exports.updateReviewById = (review_id, userInput) => {
    const validKeys = Object.keys(userInput).filter((key) => {
        if (key === "inc_votes") {
            return true
        }
    })
    if (Object.keys(userInput).length !== validKeys.length){
        return Promise.reject({status:400, msg: "Invalid query"})
    }

    return db.query(`
    UPDATE reviews
    SET votes = votes + $1
    WHERE review_id = $2
    RETURNING *;
    `,
    [userInput.inc_votes, review_id]
    )
}

exports.selectReviews = () => {
    return db.query(`
    SELECT reviews.*, COUNT(comments) AS comment_count
    FROM reviews
    LEFT JOIN comments ON reviews.review_id = comments.review_id
    GROUP BY reviews.review_id
    ORDER BY reviews.created_at DESC`
    )
    .then(({rows}) => {
        rows.forEach((row) => {
            row.comment_count = Number(row.comment_count)
        })
        return rows
    })
};