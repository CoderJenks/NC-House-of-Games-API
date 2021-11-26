const { deleteCommentById } = require("../models/comments-model.js");

exports.removeCommentById = (req, res, next) => {
    const {comment_id} = req.params;
    deleteCommentById(comment_id)
    .then((comment) => {
        res.status(204).send({msg: "comment deleted",comment: comment});
    })
    .catch(next);
};