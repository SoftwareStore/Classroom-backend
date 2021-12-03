const Exam = require('../../Models/Exam/examModel');
const Course = require('../../Models/Course/courseModel');

module.exports = {
    index: async (req, res, next) => {
        const exam = await Exam.find({});
        res.status(200).json(exam)
    },
    newExam: async (req, res, next) => {
        const newExam = new Exam(req.body);
      
        
        try {
            const exam = await newExam.save();
            await Course.findOneAndUpdate({ Code: req.params.id }, { $push: { 'exams': exam._id } })
            
            res.status(200).json(exam);
        } catch (e) {
            console.log(e);
            res.status(500).json({ success: false });
        }
    },
    getExam: async(req,res,next)=>{
        const exam = await Exam.find({_id:req.params.id});
        res.status(200).json({exam})
    },
    delExam: async(req,res,next)=>{
        const codigo= req.body.code;
        await Exam.findByIdAndDelete(req.body._id)
        await Course.findOneAndUpdate({ Code:codigo }, { $pull: { 'exams': req.body._id } })
        res.status(204).json()

    }
}