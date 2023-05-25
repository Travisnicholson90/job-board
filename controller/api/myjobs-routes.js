const router = require("express").Router();
const { Job, User } = require("../../models");
// const withAuth = require("../../utils/auth");

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      job_name,
      job_description,
      job_suburb,
      job_date,
      job_time,
      job_duration,
      job_price,
    } = req.body;

    // Perform the update operation and store the updated row in variable
    const updatedRowCount = await Job.update(
      {
        job_name,
        job_description,
        job_suburb,
        job_date,
        job_time,
        job_duration,
        job_price,
      },
      {
        where: {
          id,
        },
      },
    );

    // Check if any rows were updated
    if (updatedRowCount[0] === 0) {
      res.status(404).json({ message: "Job not found" });
      return;
    }

    // Fetch the updated job
    const updatedJob = await Job.findByPk(id);
    res.status(200).json(updatedJob);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update job" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const job = await Job.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Job deleted!"});
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Failed to delete job"});
  }
});

module.exports = router;
