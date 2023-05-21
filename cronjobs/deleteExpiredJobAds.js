const cron = require("node-cron");
const { Job } = require("../models");
const { Op } = require("sequelize");
const moment = require("moment");

// Delete expired job ads and job adds that are older than 1 month every day at 12:00am
cron.schedule("0 0 * * *", async () => {
  try {
    const expiredJobAds = await Job.findAll({
      where: {
        [Op.or]: [
          // Find jobs that are expired or older than 1 month
          {
            created_at: {
              // Find jobs created more than 30 days ago with sequelize operator Op.lt (less than)
              [Op.lt]: new Date(new Date() - 30 * 24 * 60 * 60 * 1000),
            },
          },
          {
            job_date: {
              // Find jobs that are expired with sequelize operator Op.lt (less than)
              [Op.lt]: new Date(),
            },
          },
        ],
      },
    });

    // Delete expired job ads
    expiredJobAds.forEach(async (job) => {
      await job.destroy();
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = cron;
