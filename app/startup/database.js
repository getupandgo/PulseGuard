const mongoose = require('mongoose')
const Promise = require('bluebird')
const config = require('config')

module.exports = () => {
  mongoose.Promise = Promise
  mongoose.connect(config.get('database'), { useMongoClient: true })
}
