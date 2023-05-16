const router = require('express').Router();
const { Job } = require('../../models');

// get and render 20 jobs
router.get('/', async (req, res) => {
  try {
    // pagination could fetch and display a limited amount of jobs based on the page... how many jobs will we seed?
        const jobs = await job.findAll({ limit: 20 });
    res.render('jobs', { jobs });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one job on click
router.get('/:id', async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await job.findByPk(jobId);

    res.render('jobDetails', { job });
  } catch (err) {
    console.log(req.body);
    res.status(500).json(err);
  }
});

// create new job
// probably handled on a user page...
router.post('/', async (req, res) => {
  try {
    const { job_name, job_description, job_suburb, job_date, job_time, job_duration, job_price, job_status, job_category_id } = req.body;
    const newJob = await Job.create({ job_name, job_description, job_suburb, job_date, job_time, job_duration, job_price, job_status });

    // job_category_id is a little confusing...
    if (job_category_id & job_category_id.length > 0) {
      const categories = await JobCategory.findAll({
        where: {
          id: categoryIds,
        },
      });
    }

    res.status(200).json(newJob);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// update job
// probably handled on a user page...
router.put('/:id', (req, res) => {

});

router.delete('/:id', async (req, res) => {
  try {
const job = await Job.destroy({
  where: {
    id: req.params.id,
  },
});
res.status(200).json({message: 'Job removed'});
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
