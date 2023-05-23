const router = require("express").Router();
const { Job } = require("../../models");

// get and render 20 jobs
router.get("/", async (req, res) => {
  try {
    // pagination could fetch and display a limited amount of jobs based on the page... how many jobs will we seed?
    const jobs = await Job.findAll({ limit: 20 });
    // res.render("jobs", { jobs });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one job on click
router.get("/:id", async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findByPk(jobId);

    // res.render("jobDetails", { job });
    res.status(200).json(job);
  } catch (err) {
    console.log(req.body);
    res.status(500).json(err);
  }
});

module.exports = router;
