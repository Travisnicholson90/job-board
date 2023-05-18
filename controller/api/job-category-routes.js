const router = require("express").Router();
const { JobCategory, Job } = require("../../models");

//get category by id not working... wrong route.

// get all categories
router.get("/", async (req, res) => {
  try {
    // res.render('categories');
    const categories = await JobCategory.findAll();
    res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cannot retrieve categories" });
  }
});

// get jobs based on categories
router.get("/category/:id", async (req, res) => {
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
    res.status(500).json({ message: "Cannot retrieve jobs based on category" });
  }
});

module.exports = router;
