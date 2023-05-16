const router = require('express').Router();
const { JobCategory, Job } = require('../../models');

// show page with all categories... unnecessary if not on own page... or will it get something to fill a handlebars placeholder?
router.get('/', async (req, res) => {
    try {
        res.render('categories');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Cannot retrieve categories' });
    }
});

// get jobs based on categories
router.get('/category/:id', async (req, res) => {
    try {
    const categoryId = req.params.id;
    const jobs = await Job.findAll({
        include: [
            {
            model: JobCategory,
            where: { id: categoryId },
            },
        ],
    });
    res.status(200).json(jobs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Cannot retrieve jobs based on category' });
    }
});

module.exports = router;