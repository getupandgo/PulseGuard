const express = require('express')
const startup = require('./startup')

const app = express()

module.exports = () => startup(app)
