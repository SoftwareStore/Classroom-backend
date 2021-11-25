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
            res.clearCookie("connect.sid")
            console.log(req.isAuthenticated());
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
            res.status(200).json({ user: req.user })
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
            res.redirect('/');
        } catch (e) {
            console.log(e)
            res.status(500).json({ success: false });
        }
    },
    getCourses: async (req, res, next) => {
        //Obtiene los cursos en los que participa un usuario
        const user = await User.find({ _id: req.body.id }).populate('courses')
        res.status(200).json({ user })
    },
    addCourse: async (req, res, next) => {
        //Agrega al un curso al array del usuario , asimismo el usuario es agregado al array de participantes del curso
        const userId = req.body.userId;
        const course = await Course.findOneAndUpdate({ Code: req.body.code }, { $push: { 'participants': userId } })
        const courseId = course._id;
        const user = await User.findOneAndUpdate({ _id: userId }, { $push: { 'courses': courseId } })
        res.status(200).json({ user })
    }




















}