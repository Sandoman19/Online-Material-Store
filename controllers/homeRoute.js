//Import express router, models and auth
const router = require("express").Router();

// importing models
const { User, Product } = require("../models");
const withAuth = require("../units/auth");

// GET route with AUTH and render of homepage
router.get("/", async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const productData = await Product.findAll();

    // Serialize data so the template can read it
    const products = productData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      products,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      atrributes: { exlude: ["password"] },
    });
    const users = userData.forEach((product) => {
      product.get({ plain: true });
    });
    res.render("homepage", {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(404).json(err);
  }
});
// GET route to redirect to login
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});
// export
module.exports = router;
