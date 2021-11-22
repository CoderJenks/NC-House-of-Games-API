const cors =require('cors');
app.use(cors());

const express = require('express');
const app = express();

const { handle500StatusError, handlePSQLErrors, handleCustomErrors } = require('./controllers/errors-controller.js');
const apiRouter = require('./routes/api-router.js');


app.use(express.json());

app.use("/api",apiRouter);

app.all('/*', (req, res, next) => {
    res.status(404).send({msg: 'Path not found'})
});

app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handle500StatusError);

module.exports = app;