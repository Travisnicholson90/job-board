const router = require("express").Router();
const path = require("path");

const { Job, JobCategory, User } = require("../models");

const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "../views/home.html"));
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Job-board route
router.get("/job-board", withAuth, async (req, res) => {
  try {
    // Get 20 latest jobs to display on the job-board page
    const jobData = await Job.findAll({
      limit: 20,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["first_name", "last_name", "suburb", "email"],
        },
        {
          model: JobCategory,
          attributes: ["category_name"],
        },
      ],
    });
    // Serialize data so the template is readable
    const jobs = jobData.map((job) => job.get({ plain: true }));
    // Pass serialized data into Handlebars.js template
    res.render("job-board", jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Login route

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  // Otherwise, render the 'login' template
  res.render("login");
});

// Signup route
router.get("/signup", async (req, res) => {
  try {
    // Render the sign-up page
    res.render("signup");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Post a job route
router.get("/post-job", withAuth, async (req, res) => {
  try {
    // Render the post-job page
    res.render("post-job", { loggedIn: req.session.loggedIn });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Job categories route
router.get("/categories", withAuth, async (req, res) => {
  try {
    const categories = await JobCategory.findAll();
    res.render("categories", { categories, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cannot retrieve categories" });
  }
});

module.exports = router;
