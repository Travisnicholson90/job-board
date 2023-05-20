const router = require("express").Router();
const path = require("path");
// const loginRoutes = require('./login-routes.js');
// const categoryRoutes = require('./job-category-routes.js');
// const listingRoutes = require('./job-routes.js');
// const signupRoutes = require('./signup-routes');
// const jobPostRoutes = require('./job-post-routes');

const { Job, JobCategory, User } = require("../models");

router.get("/", async (req, res) => {
  try {
    // res.render('categories');
    const categories = await JobCategory.findAll();
    res.sendFile(path.join(__dirname, "../views/home.html"));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cannot retrieve categories" });
  }
});

module.exports = router;
