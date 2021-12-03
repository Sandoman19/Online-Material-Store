// importing express.route
const router = require("express").Router();
// import product routes
const productRoutes = require("./productsRoute");
// import user routes
const userRoutes = require("./userRoutes");
// import productType routes
const materialRoute = require("./materialRoute");
const confirmOrderRoute = require("./orderConfirmation");

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/materials", materialRoute);
router.use(confirmOrderRoute);
//export
module.exports = router;
