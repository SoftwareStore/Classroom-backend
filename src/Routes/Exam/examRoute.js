const express = require("express")
const router = express.Router();

const { index, newExam, getExam, delExam } = require('../../Controllers/Exam/examController.js')


router.get('/index', index);
router.get('/getExam/:id', getExam);
router.post('/newExam/:id', newExam);
router.delete('/deleteExam',delExam);
module.exports = router;
