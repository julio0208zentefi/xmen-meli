const redisClient = require('./../config/redis')
const client = redisClient();

client.multi()
  .hmset('users:username', {
    id: 'username',
    username: process.env.OAUTH2_USERNAME,
    password: process.env.OAUTH2_PASSWORD
  })
  .hmset('clients:client', {
    clientId: process.env.OAUTH2_CLIENT_ID,
    clientSecret: process.env.OAUTH2_SECRET
  })//clientId + clientSecret to base 64 will generate Y2xpZW50OnNlY3JldA==
  .sadd('clients:client:grant_types', [
    'password',
    'refresh_token'
  ])
  .exec(function (errs) {
    if (errs) {
      console.error(errs[0].message);
      return process.exit(1);
    }
    process.exit();
  });
