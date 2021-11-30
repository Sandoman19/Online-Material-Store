// importing express.route
const router = require("express").Router();
// import product routes
const productRoutes = require("./productsRoute");
// import user routes
const userRoutes = require("./userRoutes");
// import productType routes
const materialRoute = require("./materialRoute");

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/materials", materialRoute);

//export
module.exports = router;
