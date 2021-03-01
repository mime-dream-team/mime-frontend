const Sequelize = require('sequelize')

//const db = new Sequelize('postgres://172.17.0.1:5432/mimeDb', 'root', 'root', {
//  dialect: 'postgres'
//})

const db = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: 'data.sqlite'
})

module.exports = db
