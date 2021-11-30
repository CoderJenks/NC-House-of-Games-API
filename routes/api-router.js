const apiRouter = require("express").Router();
const getApi = require ("../controllers/api-controller");
const categoriesRouter = require("./categories-router.js");
const reviewsRouter = require("./reviews-router.js");
const commentsRouter = require("./comments-router.js");


apiRouter.get("/", (req, res) => {
    res.status(200).send({ msg: "Welcome to the House of Games"})
});

// apiRouter.get("/", getApi);

apiRouter.use("/categories",categoriesRouter);
apiRouter.use("/reviews",reviewsRouter);
apiRouter.use("/comments",commentsRouter);


module.exports = apiRouter