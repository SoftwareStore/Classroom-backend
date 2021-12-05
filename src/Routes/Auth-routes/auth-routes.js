const express = require("express");
const router = express.Router();
const passport = require('passport')

const { login, logout} = require('../../Controllers/Auth-Controllers/authController');

router.get('/login', login);
router.get('/logout', logout);
router.get('/google', passport.authenticate('google'));
router.get('/facebook', passport.authenticate('facebook'));

router.get( '/google/redirect', passport.authenticate('google'), Google);
function Google (req, res) {
    res.redirect('http://localhost:3000/ListCurso');
}

router.get('/facebook/redirect', passport.authenticate('facebook'), Facebook);

function Facebook (req, res) {
    res.redirect('http://localhost:3000/ListCurso');
}

module.exports = router;