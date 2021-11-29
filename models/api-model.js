exports.retrieveApiJson = () => {
    return {
        msg : "Welcome to the House of Games",
        "Available End Points" : {
            "GET /api" : "Responds with a list of available end points",
            "GET /api/reviews" : "Responds with an array of reviews which accepts sort_by, order and category queries",
            "GET /api/reviews/:review_id" : "Responds with a review object corresponding to the review_id given in the endpoint",
            "PATCH /api/reviews/:review_id" : "Updates the vote count for the review corresponding to the review_id given in the endpoint and returns the updated review",
            "GET /api/reviews/:review_id/comments" : "Responds with an array of commment objects relating for the corresponding review_id given in the endpoint",
            "POST /api/reviews/:review_id/comments" : "Adds a comment to the review corresponding to the review_id given in the endpoint and returns the posted comment.  Requires a username and comment body",
            "GET /api/categories" : "Responds with an array of categories",
            "DELETE /api/comments/:comment_id" : "Deletes a comment from the database for the comment corresponding to the comment_id given in the endpoint"
        }
    }
};