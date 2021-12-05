const passport = require('passport');

const User = require('../../Models/User/userModel');
const Course = require('../../Models/Course/courseModel');
module.exports = {
    index: async (req, res, next) => {
        try {
            //Imprime todos los usuarios existentes
            const users = await User.find({});
            res.status(200).json(users);
        } catch (e) {
            console.log(e)
            res.status(500).json({ success: false })
        }
    },
    logOut: async (req, res, next) => {
        try {
            //res.logout();
            req.session = null;
            res.clearCookie();
            res.clearCookie("connect.sid")
            res.status(200).json({ success: true, status: "logout", })
        } catch (e) {
            console.log(e)
            res.status(500).json({ success: false })
        }

    },

    user: async (req, res, next) => {
        try {
            res.status(200).json({ success: true, Authenticated: req.isAuthenticated()})
        } catch (e) {
            console.log(e)
            res.status(500).json({ success: false });
        }
    },

    user2: async (req, res, next) => {
        try {
            const email = req.user.email;
            const user = await User.find({ email : email})
            res.status(200).json(user)
        } catch (e) {
            console.log(e)
            res.status(500).json({ success: false });
        }
    },

    newUser: async (req, res, next) => {
        //Genera un nuevo usuario
        //const newUser = new User(req.body);

        try {
            //const user = await newUser.save();
            // console.log(user)
            // res.cookie('idUsuario', user._id)
            res.status(200).json({ success: true })
        } catch (e) {
            console.log(e)
            res.status(500).json({ success: false });
        }
    },
    getCourses: async (req, res, next) => {
        try {
            //Obtiene los cursos en los que participa un usuario
            //const user = await User.find({ _id: req.body.id })
            const useId = req.user.id;
            const courses = await Course.find({participants: useId})
            res.status(200).json( courses )
        } catch (e) {
            console.log(e)
            res.status(500).json({ success: false });
        }
    },
    addCourse: async (req, res, next) => {
        console.log(req.body.participants)
        console.log(req.body.Code)
        try {
            //Agrega al un curso al array del usuario , asimismo el usuario es agregado al array de participantes del curso
            const userId = req.body.participants;
            const courseCode = req.body.Code;
            const course = await Course.findOneAndUpdate({ Code: courseCode }, { $push: { 'participants': userId } })
            const courseId = course._id;
            const user = await User.findOneAndUpdate({ _id: userId }, { $push: { 'courses': courseId } })
            res.status(200).json({ user })
        } catch (e) {
            console.log(e)
            res.status(500).json({ success: false });
        }
        
    }




















}