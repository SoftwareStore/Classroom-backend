const Course = require('../../Models/Course/courseModel');

module.exports = {
    index: async (req, res, next) => {
        const courses = await Course.find({});
        res.status(200).json(courses);
    },
    newCourse: async (req, res, next) => {
        console.log(req.body)
        const newCourse = new Course(req.body);

        try {
            const course = await newCourse.save();
            res.status(200).json(course);
        } catch (e) {
            console.log(e);
            res.status(500).json({ sucess: false });
        }
    },
    getCourse: async (req, res, next) => {
        console.log(req.body)
        const course = await Course.find({ Code: req.body.code })
        res.status(200).json({ course })

    }
    ,
    addParticipant: async (req, res, next) => {
        console.log(req.body)
        const course = await Course.findOneAndUpdate({ code: req.body.code }, { $push: { 'participants': req.body.participants } })
        res.status(200).json({ course });

    }





















}