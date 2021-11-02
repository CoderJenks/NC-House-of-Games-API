const { selectReviewById } = require("../models/reviews-model.js")

exports.getReviewById = (req, res, next) => {
    const review_id = req.url.substring(1);
    //Removes the / from the url.
    selectReviewById(review_id)
    .then((review) => {
        res.status(200).send({review});
    })
    .catch(next);
};