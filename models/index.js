const User = require("./user");
const Job = require("./job");
const JobCategory = require("./job_category");

// create associations
User.hasMany(Job, {
  foreignKey: "job_user_id",
  onDelete: "CASCADE",
});

Job.belongsTo(User, {
  foreignKey: "job_user_id",
});

JobCategory.hasMany(Job, {
  foreignKey: "job_category_id",
  onDelete: "CASCADE",
});

Job.belongsTo(JobCategory, {
  foreignKey: "job_category_id",
});

module.exports = { User, Job, JobCategory };
