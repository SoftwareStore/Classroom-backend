const express = require("express");
const router = express.Router();
const passport = require('passport');

const { index, user, user2, newUser, getCourses, addCourse, logOut } = require('../../Controllers/User/userController');

router.get('/', isAuthenticated, index);
router.get('/logout',isAuthenticated, logOut);
router.get('/login', isAuthenticated, user2);
router.post('/login', passport.authenticate('localLogin'), user);
router.post('/register', passport.authenticate('localRegister'), newUser);
router.get('/courses', isAuthenticated, getCourses);
router.post('/courses', isAuthenticated, addCourse);

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else{
        res.status(400).json({ success: "no Logeado" })
    }
}

module.exports = router;