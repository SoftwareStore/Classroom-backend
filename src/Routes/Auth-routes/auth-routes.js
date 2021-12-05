const express = require("express");
const router = express.Router();
const passport = require('passport')

router.get('/google', passport.authenticate('google',{scope:['profile']}));
router.get('/facebook', passport.authenticate('facebook'));
router.get( '/google/redirect', passport.authenticate( 'google'), GoogleFacebook);
router.get('/facebook/redirect', passport.authenticate('facebook'), GoogleFacebook);

function GoogleFacebook (req, res) {
    res.redirect('http://localhost:3000/ListCurso');
}
module.exports = router;