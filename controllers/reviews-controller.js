const { selectReviewById, updateReviewById } = require("../models/reviews-model.js")

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
    const voteChange = req.body.inc_votes

    updateReviewById(review_id, voteChange)
    .then((review) => {
        res.status(200).send({review});
    })
    .catch(next);
}