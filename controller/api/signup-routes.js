const router = require("express").Router();
var bcrypt = require("bcryptjs");
const { User } = require("../../models");

router.get("/", async (req, res) => {
  try {
    // Render the sign-up page
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

//create new user
// does this need more?... e.g. what to do with data recieved, etc.
router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, suburb, email, password } = req.body; //may have to change to first_name, last_name, suburb, email, password...

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

    res
      .status(200)
      .json({ message: "Created user successfully!", user: newUser });
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
