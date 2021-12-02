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

//

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
