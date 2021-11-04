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
 
    // need to force error if any property in the body isn't valid  
    // Object.keys(req.body).forEach(key => {
    //     if(key !== "inc_votes"){
    //         return Promise.reject({status:400, msg: "Invalid query"})
    //     }
    // });
    
    const {review_id} = req.params;
    // console.log(Object.keys(req.body))
    
    const voteChange = req.body.inc_votes

    updateReviewById(review_id, voteChange)
    .then(() => selectReviewById(review_id))
    .then((review) => {
        res.status(200).send({review});
    })
    .catch(next);
}