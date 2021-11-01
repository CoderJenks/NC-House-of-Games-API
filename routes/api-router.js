const apiRouter = require("express").Router();
const categoriesRouter = require('../routes/categories-router.js')

apiRouter.use("/categories",categoriesRouter)


module.exports = apiRouter