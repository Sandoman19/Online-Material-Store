// importing express.router
const router = require("express").Router();
// importing models
const { User } = require("../../models");

//Create a new user
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      console.log(userData);
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

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

router.get("/:id", async (req, res) => {
  try {
    await User.findByPk(req.params.id, {
      attributes: { exclude: ["password", "email"] },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Post,
          attributes: ["id", "title", "content", "date_created"],
        },
      ],
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// export
module.exports = router;
