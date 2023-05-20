const router = require("express").Router();
const path = require("path");

const { Job, JobCategory, User } = require("../models");

const withAuth = require("../utils/auth");

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
