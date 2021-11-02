const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;

const FACEBOOK_APP_ID = '3069091413369316';
const FACEBOOK_APP_SECRET = 'ebe7c28ebd06ad78265783b1e1c30cef';

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:5000/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
  }
));