const sequelize = require("../config/connection");
const { User, Job, JobCategory } = require("../models");

const userData = require("./userData.json");
const jobData = require("./jobData.json");
const jobCategoryData = require("./jobCategoryData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await JobCategory.bulkCreate(jobCategoryData, {
    individualHooks: true,
    returning: true,
  });

  await Job.bulkCreate(jobData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
