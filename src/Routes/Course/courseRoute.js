const express=require("express");
const router=express.Router();

const {index,newCourse,addParticipant,getCourse} = require('../../Controllers/Course/courseController');

router.get('/index',index);
router.get('/main',getCourse)
router.post('/',newCourse);
router.post('/add',addParticipant);
module.exports=router;