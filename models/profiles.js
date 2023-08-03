const Sequelize = require('sequelize');

const db = require('../util/db');
const User = require('../models/users');

const Profile = db.define("profile", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        msg: "First name can't be empty",
      },
    },
  },
  lastName: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        msg: "First name can't be empty",
      },
    },
  },
  state: {
    type: Sequelize.ENUM("male", "female"),
    validate: {
      isIn: {
        args: [["male", "female"]],
        msg: 'Invalid state value. State must be either "male" or "female".',
      },
    },
  },
});

module.exports = Profile;