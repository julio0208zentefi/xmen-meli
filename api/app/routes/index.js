const express = require("express");
const MutantsController = require("../controllers/mutants");

module.exports = function(app) {

    const router = express.Router()

    require('./oauth2')(app, router)
    require('./mutants')(app, router)
}
