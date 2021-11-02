exports.handlePSQLErrors = (err, req, res, next) => {
    if(err.code === '22P02'){
    res.status(400).send({msg: "Invalid query"})
    } else {
        next(err);
    }
};

exports.handle500StatusError = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({msg: "server error"})
};