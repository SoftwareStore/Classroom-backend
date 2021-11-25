const Course = require('../../Models/Course/courseModel');
const User = require('../../Models/User/userModel')
module.exports = {
    index: async (req, res, next) => {
        //Imprime todos los cursos existentes
        const courses = await Course.find({});
        res.status(200).json(courses);
    },
    newCourse: async (req, res, next) => {
        //Genera un nuevo curso
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
        //Obtiene un curso ingresando el codigo del curso
        //         const courseCode=;
        // console.log(req.params.id)

        const course = await Course.find({ Code: req.params.id }).populate("participants").populate("homeworks").populate("announcements").populate("exams")
        res.status(200).json({ course })

    }
    ,
    addParticipant: async (req, res, next) => {
        //Agrega un participante existente al array de participantes , asimismo el curso es agregado al array de cursos del participante
        const courseCode = req.body.code;
        console.log(courseCode)
        const participants = req.body.participants;
        var codes = participants.values();

        const course = await Course.findOneAndUpdate({ Code: courseCode }, { $push: { 'participants': participants } })
        const courseId = course._id
        for (let user of codes) {

            const userTemp = await User.findOneAndUpdate({ _id: user }, { $push: { 'courses': courseId } })
        }

        res.status(200).json({ course });

    },





















}