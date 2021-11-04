const { selectReviewById, updateReviewById, selectReviews } = require("../models/reviews-model.js");

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
    selectReviews()
    .then((reviews) => {
        res.status(200).send({reviews});
    })
    .catch(next);
};