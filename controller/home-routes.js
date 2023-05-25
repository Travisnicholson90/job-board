const router = require("express").Router();
const path = require("path");

const { Job, JobCategory, User } = require("../models");

const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const categories = await JobCategory.findAll();
    res.render("home", { categories, loggedIn: req.session.loggedIn });
    // res.sendFile(path.join(__dirname, "../views/home.html"));
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Jobs by categories route

router.get("/categories/:id", withAuth, async (req, res) => {
  try {
    const categoryId = req.params.id;
    const jobsByCategoryData = await Job.findAll({
      include: [
        {
          model: JobCategory,
          where: { id: categoryId },
        },
      ],
      order: [["created_at", "DESC"]],
    });
    const jobsByCategory = jobsByCategoryData.map((job) =>
      job.get({ plain: true })
    );

    console.log(jobsByCategory);
    res.render("categories", { jobsByCategory, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cannot retrieve jobs based on category" });
  }
});

// Job-board route
router.get("/job-board", withAuth, async (req, res) => {
  try {
    // Get 20 latest jobs to display on the job-board page
    const jobData = await Job.findAll({
      limit: 20,
      order: [["created_at", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["first_name", "last_name", "suburb", "email"],
        },
        {
          model: JobCategory,
          attributes: ["job_category_name"],
        },
      ],
    });
    // Serialize data so the template is readable
    const jobs = jobData.map((job) => job.get({ plain: true }));
    // Pass serialized data into Handlebars.js template
    console.log(jobs);

    res.render("job-board", { jobs, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Post a post-job route
router.get("/post-job", withAuth, async (req, res) => {
  try {
    // get categories for the dropdown
    const categories = await JobCategory.findAll();
    // Render the post-job page
    res.render("post-job", { categories, loggedIn: req.session.loggedIn });
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

// get jobs posted by user
router.get("/myjobs", withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;
    const jobs = await Job.findAll({ where: { job_user_id: userId } });

      res.render("myjobs", { jobs });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Signup route
router.get("/signup", async (req, res) => {
  try {
    // If the user is already logged in, redirect to the homepage
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }
    // Render the sign-up page
    res.render("signup");
    //res.sendFile(path.join(__dirname, "../views/signup.html"));
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
  // res.sendFile(path.join(__dirname, "../views/login.html"));
});

// Logout route
router.get("/logout", (req, res) => {
  // When the user logs out, the session is destroyed
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // If there is no session, then the user is not logged in, so we end the request
    res.status(404).end();
  }

  // Redirect the user to the main page
  res.redirect("/");
});

module.exports = router;
