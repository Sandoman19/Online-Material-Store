// importing express.router
const router = require("express").Router();
// import api routes
const apiRoutes = require("./api");
const homeRoute = require("./homeRoute");

router.use("/", homeRoute);
router.use("/api", apiRoutes);

// export
module.exports = router;
