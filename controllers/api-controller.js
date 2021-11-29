const {retrieveApiJson} = require ("../models/api-model")

exports.getApi("/", (req, res, next) => {
    retrieveApiJson()
    .then((apiJson) => {
    res.status(200).send(apiJson)
    })
});