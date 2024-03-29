const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const User = sequelize.define("users", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},
  {
    timestamps: null
  }
);

module.exports = User;
