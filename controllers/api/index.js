// importing express.route
const router = require("express").Router();
// import product routes
const productRoutes = require("./productsRoute");
// import user routes
const userRoutes = require("./userRoutes");
// import productType routes
const productTypeRoutes = require("./productTypeRoute");

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/product_type", productTypeRoutes);

//export
module.exports = router;
