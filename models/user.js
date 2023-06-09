const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcryptjs");

class User extends Model {}

User.init(
  {
    // define an id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // define a first_name column
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // define a last_name column
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // define a suburb column
    suburb: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    // define an email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // there cannot be any duplicate email values in this table
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    // define a password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // this means the password must be at least six characters long
        len: [6],
      },
    },
  },
  {
    // create hooks for hashing passwords
    hooks: {
      beforeCreate: async (newUserData) => {
        // hash a password
        newUserData.password = await bcrypt.hash(
          newUserData.password,
          await bcrypt.genSalt(10)
        );
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        // hash a password
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          await bcrypt.genSalt(10)
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
