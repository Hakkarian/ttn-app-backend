const Sequelize = require('sequelize');

const db = require('../util/db');
const Profile = require('../models/profiles');

const User = db.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        msg: "Name is required.",
      },
    },
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: {
        msg: "Invalid email address.",
      }
    },
  },
  role: {
    type: Sequelize.ENUM("user", "admin"),
    validate: {
      isIn: {
        args: [["user", "admin"]],
        msg: 'Invalid role value. Role must be either "user" or "admin".',
      },
    },
  },
  dateCreate: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});

User.belongsTo(Profile, { foreignKey: 'profileId'});

module.exports = User;