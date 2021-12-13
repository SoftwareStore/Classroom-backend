const express = require("express")
const router = express.Router();

const {index,newRespon } = require('../../Controllers/ResponseExam/ResponseExam')


router.get('/index', isAuthenticated, index);
router.post('/newResponExam', isAuthenticated, newRespon);



function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else{
        res.status(400).json({ success: "no Logeado" })
    }
}
module.exports = router;
