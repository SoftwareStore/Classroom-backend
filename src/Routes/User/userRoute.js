const express = require("express");
const router = express.Router();
const passport = require('passport');

const { index, user, newUser, getCourses, addCourse, logOut } = require('../../Controllers/User/userController');

router.get('/', index);
router.get('/logout', logOut);
router.get('/courses', isAuthenticated, getCourses);
router.post('/courses', isAuthenticated, addCourse);
router.post('/login', passport.authenticate('localLogin'), user);
router.post('/register', passport.authenticate('localRegister'), newUser);

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
}
module.exports = router;