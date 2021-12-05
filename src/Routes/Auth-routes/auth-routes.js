const express = require("express");
const router = express.Router();
const passport = require('passport')

router.get('/google', passport.authenticate('google',{scope:['email','profile']}));
router.get('/facebook', passport.authenticate('facebook'));

router.get( '/google/redirect', passport.authenticate('google'), Google);

router.get('/facebook/redirect', passport.authenticate('facebook'), Facebook);

function Facebook (req, res) {
    res.redirect('http://localhost:3000/ListCurso');
}
function Google (req, res) {
    res.redirect('https://classroombackend.herokuapp.com/');
}
module.exports = router;