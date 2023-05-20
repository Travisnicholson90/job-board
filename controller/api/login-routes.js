const router = require("express").Router();
var bcrypt = require("bcryptjs");
const { User } = require("../../models");

// login to account
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    // user authentication logic
    const user = await User.findOne({
      where: { email: email },
    });

    // checking the password
    const validPassword = await bcrypt.compare(password, user.password);

    //error handling for wrong password
    if (!user || !validPassword) {
      res.status(401).json({
        message:
          "Invalid user or password" + email + password + user + validPassword,
      });
      return;
    }
    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(400).json(err);
  }
});

// update user
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { first_name, last_name, suburb, email, password } = req.body;
    const user = await User.findByPk(id);

    // error handling for non-existent user
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }
    // Updates individual fields of the user if they exist in the request body
    if (first_name) {
      user.first_name = first_name;
    }
    if (last_name) {
      user.last_name = last_name;
    }
    if (suburb) {
      user.suburb = suburb;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }

    // saves the user to User table
    await user.save();

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "User deleted", userData });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
