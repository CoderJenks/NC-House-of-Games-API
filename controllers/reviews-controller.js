const { selectReviewById, updateReviewById, selectReviews, selectCommentsByReview } = require("../models/reviews-model.js");

exports.getReviewById = (req, res, next) => {
    const {review_id} = req.params;
    selectReviewById(review_id)
    .then((review) => {
        res.status(200).send({review});
    })
    .catch(next);
};

exports.patchReviewById = (req, res, next) => {
    const {review_id} = req.params;    
    const userInput = req.body

    updateReviewById(review_id, userInput)
    .then(() => selectReviewById(review_id))
    .then((review) => {
        res.status(200).send({review});
    })
    .catch(next);
}

exports.getReviews = (req, res, next) => {
    const { sort_by , order, category } = req.query

    selectReviews(sort_by, order, category)
    .then((reviews) => {
        res.status(200).send({reviews});
    })
    .catch(next);
};

exports.getCommentsByReview = (req, res, next) => {
    const {review_id} = req.params;

    selectCommentsByReview(review_id)
    .then((comments) => {
        res.status(200).send({comments});
    })
    .catch(next);
}