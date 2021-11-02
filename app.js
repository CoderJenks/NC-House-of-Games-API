const app = require('express')();

const apiRouter = require('./routes/api-router.js');

app.use("/api",apiRouter);

app.all('/*', (req, res, next) => {
    res.status(404).send({msg: 'Path not found'})
});

module.exports = app;