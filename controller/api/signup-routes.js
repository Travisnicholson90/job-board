const router = require("express").Router();
const { User } = require("../../models");

//create new user
router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, suburb, email, password } = req.body;
    console.log(first_name, last_name, suburb, email, password);

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create a new user
    const newUser = await User.create({
      first_name,
      last_name,
      suburb,
      email,
      password,
    });

    // set the 'loggedIn' variable to true
    req.session.loggedIn = true;
    // set the 'user_id' variable to the 'id' of the newly created user
    req.session.user_id = newUser.id;
    // set the 'username' variable to the 'username' of the newly created user
    req.session.username = newUser.email;

    // save session variables and redirect to the main page once saved
    req.session.save(() => {
      res.redirect("/");
    });
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      const validationErrors = err.errors.map((error) => error.message);
      return res
        .status(400)
        .json({ message: "Validation error", errors: validationErrors });
    }
    res.status(500).json(err);
  }
});

module.exports = router;
