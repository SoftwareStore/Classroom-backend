const express = require("express");
const router = express.Router();

const { index, newUser, getCourses } = require('../../Controllers/User/userController');

router.get('/', index);
router.get('/courses', getCourses);
router.post('/', newUser);

module.exports = router;