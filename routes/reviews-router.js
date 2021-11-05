const reviewsRouter = require("express").Router();
const { getReviewById, patchReviewById, getReviews, getCommentsByReview } = require("../controllers/reviews-controller");

reviewsRouter
.route("/:review_id")
.get(getReviewById)
.patch(patchReviewById);

reviewsRouter
.route("/")
.get(getReviews)

reviewsRouter
.route("/:review_id/comments")
.get(getCommentsByReview)

module.exports = reviewsRouter;