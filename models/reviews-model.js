const { forEach } = require('methods');
const db = require('../db/connection.js');
const { checkExists } = require('../utils/utils.js');

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

exports.selectReviews = async (sort_by = "created_at", order = "desc", category) => {

    if(!["asc","desc"].includes(order)){
        return Promise.reject({status: 400, msg: "Invalid order query"})
    };


    let queryStr = `
    SELECT reviews.*, COUNT(comments) AS comment_count
    FROM reviews
    LEFT JOIN comments
    ON reviews.review_id = comments.review_id`;

    
    const queryValues = [];

    if(category){
        const checkStr = `SELECT * FROM reviews WHERE category = $1;`;
        // const {rows} = await db.query(checkStr, [category])
        //     if(rows.length === 0){
        //         return Promise.reject({status:404, msg: "Category not found"})
        //     }
        
        await checkExists("categories","slug",category)

        
        queryValues.push(category);
        queryStr += `
        WHERE category = $1`
    };

    queryStr += `
    GROUP BY reviews.review_id
    ORDER BY reviews.${sort_by} ${order};`;
    
    
    return db.query(queryStr,queryValues)
    .then(({rows}) => {
        rows.forEach((row) => {
            row.comment_count = Number(row.comment_count)
        })
        return rows
    });
};

// exports.selectCommentsByReview = (review_id) => {

// } 