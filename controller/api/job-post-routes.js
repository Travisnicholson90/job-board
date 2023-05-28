const router = require("express").Router();
const { Job, JobCategory } = require("../../models");

// create job
router.post("/", async (req, res) => {
  try {
    const {
      job_name,
      job_description,
      job_suburb,
      job_date,
      job_time,
      job_duration,
      job_price,
      job_category_id,
    } = req.body;

    console.log(job_category_id);

    // Find the user id of the logged in user
    const job_user_id = req.session.user_id;

    const newJob = await Job.create({
      job_name,
      job_description,
      job_suburb,
      job_date,
      job_time,
      job_duration,
      job_price,
      job_category_id,
      job_user_id,
    });

    res.status(200).json(newJob);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
