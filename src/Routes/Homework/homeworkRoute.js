const express = require("express")
const router = express.Router();

const { index, newHomework, getHomework } = require('../../Controllers/Homework/homeworkController.js')

router.get('/index', index);
router.get('/main', getHomework);
router.post('/newHomework', newHomework);
module.exports = router;
