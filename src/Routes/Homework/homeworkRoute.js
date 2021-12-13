const express = require("express")
const router = express.Router();

const { index, newHomework, getHomework } = require('../../Controllers/Homework/homeworkController.js')

router.get('/index', isAuthenticated, index);
router.get('/main/:id', isAuthenticated, getHomework);
router.post('/newHomework', isAuthenticated, newHomework);



function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else{
        res.status(400).json({ success: "no Logeado" })
    }
}
module.exports = router;
