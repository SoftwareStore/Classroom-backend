const Exam = require('../../Models/Exam/examModel');
const Course = require('../../Models/Course/courseModel');

module.exports = {
    index: async (req, res, next) => {
        const exam = await Exam.find({});
        res.status(200).json(exam)
    },
    newExam: async (req, res, next) => {
        const newExam = new Exam(req.body);
        const codigo= req.body.code;
        // console.log(codigo)
        
        try {
            const exam = await newExam.save();
            //const course = await Course.findOneAndUpdate({ Code:codigo }, { $push: { 'homeworks': homework._id } })
            
            res.status(200).json(exam);
        } catch (e) {
            console.log(e);
            res.status(500).json({ success: false });
        }
    },
    getExam: async(req,res,next)=>{
        const exam = await Exam.find({_id:req.body._id}).populate("Course")
        res.status(200).json({exam})
    }
}