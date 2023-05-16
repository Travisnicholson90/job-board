const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class JobCategory extends Model {}

JobCategory.init(
  {
    // define an id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // define a job_category_name column
    job_category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "job_category",
  }
);

module.exports = JobCategory;
