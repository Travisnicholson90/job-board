const router = require('express').Router();
const { User } = require('../../models');

// viewing of the seeded userData, etc. can be done in mysql workbench... or we can create routes for it

// show login page
router.get('/', async (req, res) => {
    try {
        // Render the login-in page
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
});

// login to account
router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        // user authentication logic
        const user = await User.findOne({
            where: { username },
        });
        if (!user || !user.validPassword(password)) {
            res.status(401).json({ message: 'Invalid username or password' });
            return;
        }
        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        res.status(400).json(err);
    }
});

// update user
router.put('/:id', async (req, res) => {
    try {
    const id = req.params.id;
    const { username, password } = req.body;
    const user = await User.findByPk(id);

    if (!user) {
        res.status(401).json({ message: 'User not found' });
        return;
    }

    if (username) {
        user.username = username;
    }

    if (password) {
        user.password = password;
    }

    await user.save();

    res.status(200).json({ message: 'Login successful', user });
} catch (err) {
    res.status(400).json(err);
}
});

router.delete('/:id', async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
