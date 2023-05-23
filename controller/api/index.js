const router = require("express").Router();
const loginRoutes = require("./login-routes.js");
const signupRoutes = require("./signup-routes");
const jobPostRoutes = require("./job-post-routes");

router.use("/login", loginRoutes);
router.use("/signup", signupRoutes);
router.use("/job-post", jobPostRoutes);

module.exports = router;
