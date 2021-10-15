const User = require('../../Models/User/userModel');
const Course = require('../../Models/Course/courseModel');
module.exports = {
    index: async (req, res, next) => {
        const users = await User.find({});
        res.status(200).json(users);
    },
    newUser: async (req, res, next) => {
        const newUser = new User(req.body);
        try {
            const user = await newUser.save();
            res.status(200).json({ success: true })
        } catch (e) {
            console.log(e);
            res.status(500).json({ success: false });
        }
    },
    getCourses: async (req, res, next) => {
        console.log(req.body)
        const user = await User.find({ _id: req.body.id }).populate('courses')
        res.status(200).json({ user })



    }




















}