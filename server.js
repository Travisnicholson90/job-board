const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const routes = require("./controller");
const sequelize = require("./config/connection");
const task = require("./cronjobs/deleteExpiredJobAds.js");
const helpers = require("./utils/helper");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3001;

// Generate a secure secret key
const secret = crypto.randomBytes(64).toString("hex");

// Set up sessions and connect to Sequelize db
const sess = {
  secret: secret,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Set up handlebars helper
const hbs = exphbs.create({ helpers });

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    // Start the cron job
    task.start();
    console.log("Now listening");
  });
});
