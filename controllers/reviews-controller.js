const { selectReviewById, updateReviewById } = require("../models/reviews-model.js");
const { checkKeysValid } = require("../utils/utils.js");

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