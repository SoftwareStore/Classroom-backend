const express = require("express");
const router = express.Router();

const { index, newUser, getCourses, addCourse, logOut } = require('../../Controllers/User/userController');

router.get('/', index);
router.get('/logout', logOut);
router.get('/courses', getCourses);
router.post('/', newUser);
router.post('/courses', addCourse);

module.exports = router;