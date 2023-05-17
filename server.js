const express = require("express");
const routes = require("./controller");
const sequelize = require("./config/connection");
const expressHbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3001;
app.engine("hbs", expressHbs({ layoutsDir: "views/layouts/", defaultLayout: "main-layout", extname: "hbs" }));
app.set("view engine", "handlebars");
app.set("views", "views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
