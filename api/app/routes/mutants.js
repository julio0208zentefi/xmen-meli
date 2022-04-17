module.exports = function (app, router) {
  const MutantsController = require('../controllers/mutants')

  app.post('/mutant', app.oauth.authorise(), MutantsController.isMutant)
  app.get('/stats', app.oauth.authorise(), MutantsController.stats)

  return router
}
