const express = require("express");
const router = express.Router();
const passport = require('passport')

const { login, logout, google, facebook} = require('../../Controllers/Auth-routes/auth-routesController');

router.get('/login', isAuthenticated, login);
router.get('/logout', isAuthenticated, logout);
router.get('/google', passport.authenticate('google',{scope:['email', 'profile']}));
router.get('/facebook', passport.authenticate('facebook'));
router.get( '/google/redirect', passport.authenticate( 'google'), google);
router.get('/facebook/redirect', passport.authenticate('facebook'), facebook);

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else{
        res.status(400).json({ success: "no Logeado" })
    }
}

module.exports = router;