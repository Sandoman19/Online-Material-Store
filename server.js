// importing required const and file paths
const path = require("path");
const express = require("express");
const session = require("express-session");
const { engine } = require("express-handlebars");
const routes = require("./controllers");

// import sequelize
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// add app
const app = express();

// used for emailing of invoice
require("dotenv").config()
const nodemailer = require("nodemailer")
const hbs = require("nodemailer-express-handlebars");

const transporter = nodemailer.createTransport({
  host:  process.env.SMTP_HOST,
  port:  process.env.SMTP_PORT,
  auth: {
    user:  process.env.SMTP_USER,
    pass:  process.env.SMTP_PASSWORD
  }
});

const options = {
  viewEngine: {
    partialsDir: __dirname + "/view/partials",
    layoutsDir: __dirname + "/view/layouts",
    extname: ".hbs"
  },
  extName: ".hbs",
  viewPath: "view"
};

transporter.use("compile", hbs(options));
app.get("/", async (req, res) => {
  try {
    const order = {
      colour: "Chalkstone",
      finish: "Gloss",
      length: 2500,
      width: 1000,
      thickness: 20,
      name: "Patrik",
      price: 277
    };

    const mailInfo = {
      from: "shop@example.com",
      to: "test943933@test.com",
      subject: "Order Confirmation",
      template: "orderConfirmation",
      context: order
    };

    await transporter.sendMail(mailInfo);

    res.send("email sent");
    
  } catch (e) {
    console.log(e);
    res.status(500).send("Something broke!");
  }
});

// set port
const PORT = process.env.PORT || 3001;

// create session and set handlebars engine
const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
//let express know which engine to use
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// set express methods
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// let express use routes
app.use(routes);

// set sequelize for port
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
