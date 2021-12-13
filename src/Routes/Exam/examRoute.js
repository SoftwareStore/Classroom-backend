const express = require("express")
const router = express.Router();

const { index, newExam, getExam, delExam } = require('../../Controllers/Exam/examController.js')


router.get('/index', isAuthenticated, index);
router.get('/getExam/:id', isAuthenticated, getExam);
router.post('/newExam/:id', isAuthenticated, newExam);
router.delete('/deleteExam', isAuthenticated,delExam);




function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else{
        res.status(400).json({ success: "no Logeado" })
    }
}
module.exports = router;
