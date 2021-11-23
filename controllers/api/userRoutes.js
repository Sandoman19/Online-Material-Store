// importing express.router
const router = require("express").Router();
// importing models
const { User } = require("../../models");

// post for login see 23-AUTH review
router.post("/login", async (req, res) => {});
// post for log out see 23-AUTH review
router.post("/logout", async (req, res) => {});

// export
module.exports = router;
