// used for emailing of invoice
require("dotenv").config();
const nodemailer = require("nodemailer");
const router = require("express").Router();
const hbs = require("nodemailer-express-handlebars");
const { Material, User } = require("../../models");
const withAuth = require("../../units/auth");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const options = {
  viewEngine: {
    partialsDir: __dirname + "/../../view/partials",
    layoutsDir: __dirname + "/../../view/layouts/mail",
    extname: ".handlebars",
  },
  extName: ".handlebars",
  viewPath: "view",
};

transporter.use("compile", hbs(options));
router.post("/materials/:id/confirm-order", withAuth, async (req, res) => {
  // get the material model
  const material = await Material.findByPk(req.params.id);
  console.log(material);
  if (!material) {
    res.status(400).json({ data: "material not found" });
    return;
  }
  try {
    const user = await User.findByPk(req.session.user_id);

    const order = {
      colour: material.colour,
      finish: material.finish,
      length: material.length,
      width: material.width,
      thickness: material.thickness,
      name: material.name,
      price: material.price,
    };

    console.log(req.session);
    console.log(user);

    const mailInfo = {
      from: "shop@example.com",
      to: user.email,
      subject: "Order Confirmation",
      template: "orderConfirmation",
      context: order,
    };

    await transporter.sendMail(mailInfo);

    res.send("email sent");
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send("Something broke! the eamil confirmation did not send");
  }
});

module.exports = router;
