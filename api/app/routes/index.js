const express = require('express')

module.exports = function (app) {
  const router = express.Router()

  require('./oauth2')(app, router)
  require('./mutants')(app, router)
}
