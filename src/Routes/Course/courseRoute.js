const express=require("express");
const router=express.Router();

const {index,newCourse,addParticipant,getCourse} = require('../../Controllers/Course/courseController');

router.get('/index',isAuthenticated,index);
router.get('/:id',isAuthenticated,getCourse)
router.post('/',isAuthenticated,newCourse);
router.post('/add',isAuthenticated,addParticipant);



function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else{
        res.status(400).json({ success: "no Logeado" })
    }
}

module.exports=router;