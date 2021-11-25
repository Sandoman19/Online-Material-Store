// importing express.router
const router = require("express").Router();
// importing models
const { User } = require("../../models");

// post for login see 23-AUTH review
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({
        message:
          "Incorrect email or password, please try again or contact your admin",
      });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({
        message:
          "Incorrect email or password, please try again or contact your admin",
      });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "Your are now logged in, enjoy" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
// post for log out see 23-AUTH review
router.post("/logout", async (req, res) => {
  if (req.seesion.logged_in) {
    req.session.destro(() => {
      res.status(202).end();
    });
  } else {
    res.status(404).end();
  }
});

// export
module.exports = router;
