const express = require("express")
const router = express.Router();

const {index,newRespon } = require('../../Controllers/ResponseExam/ResponseExam')


router.get('/index', index);
router.post('/newResponExam', newRespon);

module.exports = router;
