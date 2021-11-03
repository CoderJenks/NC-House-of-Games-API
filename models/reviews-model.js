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
        const review = rows[0];
        if(rows.length !== 0) {
            rows[0]['comment_count'] = Number(rows[0]['comment_count']);
            return rows[0];
        } else {
            return Promise.reject({status: 404, msg: `${review_id} not found`})
        }
    })
};

exports.updateReviewById = (review_id, voteChange) => {
    return db.query(`
    UPDATE reviews
    SET votes = votes + $1
    WHERE review_id = $2
    RETURNING *;`,
    [voteChange, review_id]
    )
    .then(({rows}) => {
        if(rows.length !== 0) {
        return rows[0];
        } else {
            return Promise.reject({status: 404, msg: `${review_id} not found`})
        }
    })
}