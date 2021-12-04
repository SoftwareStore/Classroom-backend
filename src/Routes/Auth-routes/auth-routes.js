const express = require("express");
const router = express.Router();
const passport = require('passport')

const { login, logout, google, facebook} = require('../../Controllers/Auth-routes/auth-routesController');

router.get('/login', login);
router.get('/logout', logout);
router.get('/google', passport.authenticate('google',{scope:['email', 'profile']}));
router.get('/facebook', passport.authenticate('facebook'));
router.get( '/google/redirect', passport.authenticate( 'google'), google);
router.get('/facebook/redirect', passport.authenticate('facebook'), facebook);

module.exports = router;