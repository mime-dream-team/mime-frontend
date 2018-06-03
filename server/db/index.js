const Sequelize = require('sequelize')
const db = require('./_db')
const User = require('./models/User')

// import all models here
// define all relationships here

module.exports = { db, User }
