// importing express.router
// import user routes
// import product routes
const router = require("express").Router();
const productRoutes = require("./productRoute");
const userRoutes = require("./userRoutes");

router.use("/users", userRoutes);
router.use("/products", productRoutes);

module.exports = router;
