const User = require('../../Models/User/userModel');

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




















}