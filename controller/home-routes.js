const router = require("express").Router();
const path = require("path");
const dayjs = require("dayjs");

const { Job, JobCategory, User } = require("../models");

const withAuth = require("../utils/auth");

// Home route
router.get("/", async (req, res) => {
  try {
    // Retrieve signupSuccess parameter from the query string if present
    const signupSuccess = req.query.signupSuccess === "true";
    // Get all job categories for the prospect dynamic pupulation of the list on the homepage
    const categories = await JobCategory.findAll();
    res.render("home", {
      categories,
      signupSuccess,
      loggedIn: req.session.loggedIn,
    });
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
          attributes: ["job_category_name"],
          where: { id: categoryId },
        },
        {
          model: User,
          attributes: ["first_name", "last_name", "suburb", "email"],
        },
      ],
      order: [["created_at", "DESC"]],
    });
    const jobsByCategory = jobsByCategoryData.map((job) =>
      job.get({ plain: true })
    );

    console.log(jobsByCategory);
    res.render("categories", {
      jobsByCategory,
      loggedIn: req.session.loggedIn,
    });
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
    const jobsDateFormatted = jobs.map((job) => {
      job.formattedDateTime =
        dayjs(jobs[0].job_date).format("DD-MM-YYYY") + " " + jobs[0].job_time;
      return job;
    });

    console.log(jobsDateFormatted);

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

    // Retrieve the jobPosted and jobNotPosted query parameter if present:
    const jobPosted = req.query.jobPosted === "true";
    const jobNotPosted = req.query.jobNotPosted === "true";
    // Render the post-job page
    res.render("post-job", {
      categories,
      jobPosted,
      jobNotPosted,
      loggedIn: req.session.loggedIn,
    });
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

// My Jobs route
router.get("/myjobs", withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;
    const jobs = await Job.findAll({ where: { job_user_id: userId } });

    console.log(jobs);
    res.render("myjobs", { jobs });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Edit Job route - get the job to edit
router.get("/edit-job/:id", withAuth, async (req, res) => {
  try {
    // Retrieve the jobUpdated query parameter if present:
    const jobUpdated = req.query.jobUpdated === "true";

    const userId = req.session.user_id;
    const jobId = req.params.id;
    const jobs = await Job.findAll({ where: { job_user_id: userId } });
    console.log(jobs);
    console.log("jobId-----", jobId);

    res.render("edit-job", {
      jobs,
      jobId,
      jobUpdated,
      loggedIn: req.session.loggedIn,
    });
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
  // Retrive the loginFailed query parameter if present
  const loginFailed = req.query.loginFailed === "true";
  // Otherwise, render the 'login' template
  res.render("login", { loginFailed });
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
