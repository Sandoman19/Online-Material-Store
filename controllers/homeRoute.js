//Import express router, models and auth
const router = require("express").Router();
// importing models
const { User } = require("../models");
const withAuth = require("../units/auth");

// GET route with AUTH and render of homepage
router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      atrributes: { exlude: ["password"] },
    });
    const user = userData.forEach((product) => {
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
