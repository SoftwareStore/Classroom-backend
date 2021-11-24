const express = require("express")
const router = express.Router();

const { index, newExam, getExam } = require('../../Controllers/Exam/examController.js')

router.get('/index', index);
router.get('/main', getExam);
router.post('/newExam', newExam);
module.exports = router;
