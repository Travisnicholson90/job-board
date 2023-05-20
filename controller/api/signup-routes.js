const router = require("express").Router();
var bcrypt = require("bcryptjs");
const { User } = require("../../models");

//create new user
router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, suburb, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash a password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user
    const newUser = await User.create({
      first_name,
      last_name,
      suburb,
      email,
      password: hashedPassword,
    });

    // set session variables
    req.session.save(() => {
      // set the 'loggedIn' variable to true
      req.session.loggedIn = true;
      // set the 'user_id' variable to the 'id' of the newly created user
      req.session.user_id = newUser.id;
      // set the 'username' variable to the 'username' of the newly created user
      req.session.username = newUser.username;
      res
        .status(200)
        .json({ message: "Created user successfully!", user: newUser });
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
