module.exports = function(app, router) {

  const oauthserver = require('oauth2-server');

  app.oauth = oauthserver({
    model: require('./../../config/oauth2'),
    grants: ['password', 'refresh_token'],
    debug: true
  });

  app.all('/oauth/token', app.oauth.grant())

}


