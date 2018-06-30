const Sequelize = require('sequelize')
const db = require('./_db')
const Mime = require('./models/Mime')
const Shape = require('./models/Shape')

Mime.hasMany(Shape)
// 'getShapes', 'setShapes', 'createShape', 'addShape', 'addShapes', 'removeShape', 'removeShapes', 'hasShape', 'hasShapes', and 'countShapes'

Shape.belongsTo(Mime)
// 'getMime', 'setMime', and 'createMime'

module.exports = { db, Mime, Shape }
