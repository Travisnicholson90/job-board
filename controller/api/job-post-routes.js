const router = require('express').Router();
const { Job } = require('../../models');

// posting new job not working. doesn't like job-category-id and job-user-id

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
  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { job_name, job_description, job_suburb, job_date, job_time, job_duration, job_price, job_status } = req.body;
  
      const updatedJob = await Job.update(
        {
          job_name,
          job_description,
          job_suburb,
          job_date,
          job_time,
          job_duration,
          job_price,
          job_status
        },
        {
          where: {
            id
          }
        }
      );
      res.status(200).json(updatedJob);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to update job' });
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const job = await Job.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ message: 'Job removed' });
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  module.exports = router;