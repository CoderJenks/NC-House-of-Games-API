exports.handlePSQLErrors = (err, req, res, next) => {
    if(err.code === '22P02'){
    res.status(400).send({msg: "Invalid query"})
    }
    else if(err.code === '23514'){
        res.status(400).send({msg: "Change would result in invalid value"})
    }
    else if(err.code === '42703'){
        res.status(400).send({msg: "Invalid sort_by query"})
    }
    else {
        next(err);
    }
};

42703
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