const router = require("express").Router();
const loginRoutes = require("./login-routes.js");
const signupRoutes = require("./signup-routes");
const jobPostRoutes = require("./job-post-routes");
const myJobsRoutes = require("./myjobs-routes");

// create routes for login, signup, job-post, myjobs
router.use("/login", loginRoutes);
router.use("/signup", signupRoutes);
router.use("/job-post", jobPostRoutes);
router.use("/myjobs", myJobsRoutes);

module.exports = router;
