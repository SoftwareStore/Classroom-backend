const Homework = require('../../Models/Homework/homeworkModel');
const Course = require('../../Models/Course/courseModel');

module.exports = {
    index: async (req, res, next) => {
        const homeworks = await Homework.find({});
        res.status(200).json(homeworks)
    },
    newHomework: async (req, res, next) => {
        const newHomework = new Homework(req.body);
        try {
            const homework = await newHomework.save();
            const course = await Course.find({ Code: req.body.Course })
            
            res.status(200).json(homework);
        } catch (e) {
            console.log(e);
            res.status(500).json({ success: false });
        }
    },
    getHomework:async(req,res,next)=>{
        const homework = await Homework.find({_id:req.body._id}).populate("Course")
        res.status(200).json({homework})
    }












}