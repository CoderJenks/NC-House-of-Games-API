exports.handlePSQLErrors = (err, req, res, next) => {
    if(err.code === '22P02'){
    res.status(400).send({msg: "Invalid query"})
    } else if(err.code === '23514'){
    res.status(400).send({msg: "Change would result in invalid value"})
    } else {
        next(err);
    }
};

exports.handleCustomErrors = (err, req, res, next) => {
    if(err.status && err.msg){
    res.status(err.status).send({msg: err.msg})
    } else {
        next(err);
    }
};

exports.handle500StatusError = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({msg: "server error"})
};