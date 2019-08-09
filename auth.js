var jwtSecret = 'your_jwt_secret'; //has to be same key used in the JWT strategy
var jwt = require('jsonwebtoken');
const passport = require('passport');
require('./passport'); //Your local passport file

function generateJWTToken(user) {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, // This is the username you're encoding in the JWT
    expiresIn: '7d', // Specifies token/session will expire in 7 days
    algorithm: 'HS256', // Algorithm used to "sign" or encode the values of the JWT
  });
}

/* POST login. */
module.exports = (router) => {
  router.post('/login', (req,res) => {
    passport.authenticate('local', {session: false}, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right here!',
          user: user
        });
      }
      req.login(user,{session:false}, (error) => {
        if(error){
          res.send(error);
        }
        var token = generateJWTToken(user.toJSON());
        return res.json({user, token});
      });
    })(req,res);
  });
}
