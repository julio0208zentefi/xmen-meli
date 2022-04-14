const express = require('express')
const router = express.Router()
const MutantsController = require('../controllers/mutants')

router.post('/mutant', MutantsController.isMutant)
router.get('/stats', MutantsController.stats)

module.exports = router