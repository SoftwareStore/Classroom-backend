const router = require('express').Router();
const passport = require('passport')

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.logout();
    req.session = null;
    res.clearCookie();
    res.redirect('https://classroombackend.herokuapp.com/');
});

// auth with google+
router.get('/google', passport.authenticate('google',{
    scope:['email', 'profile']
}));

// callback route for google to redirect to
router.get( '/google/redirect',
    passport.authenticate( 'google', {
        successRedirect: 'https://classroombackend.herokuapp.com/',
        failureRedirect: 'https://classroombackend.herokuapp.com/auth/login'
}));
// auth with facebook
router.get('/facebook', passport.authenticate('facebook'));

// callback route for facebook to redirect to
router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
    res.redirect('https://classroombackend.herokuapp.com/')
});

module.exports = router;