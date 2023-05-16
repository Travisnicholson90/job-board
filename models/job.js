const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Job extends Model {}

Job.init(
  {
    // define an id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // define a job_name column
    job_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // define a job_description column
    job_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // define a job_address column
    job_suburb: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // define a job_date column
    job_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // define a job_time column
    job_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    // define a job_duration column
    job_duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // define a job_price column
    job_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    // define a job_status column
    job_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // define a job_category_id column
    job_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "job_category",
        key: "id",
      },
    },
    // define a job_user_id column
    job_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "job",
  }
);

module.exports = Job;
