exports.handle500StatusError = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({msg: "server error"})
};