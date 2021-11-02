const Announcement = require('../../Models/Announcement/announcementModel');
const Course = require('../../Models/Course/courseModel');

module.exports = {
    index: async (req, res, next) => {
        const announcement = await Announcement.find({});
        res.status(200).json(announcement)
    },
    newAnnouncement: async (req, res, next) => {
        const newAnnouncement = new Announcement(req.body);
        const codigo = req.body.code;
        // console.log(codigo)

        try {
            const announcement = await newAnnouncement.save();
            const course = await Course.findOneAndUpdate({ Code: codigo }, { $push: { 'announcements': announcement._id } })

            res.status(200).json(announcement);
        } catch (e) {
            console.log(e);
            res.status(500).json({ success: false });
        }
    },
    getAnnouncement: async (req, res, next) => {
        const announcement = await Announcement.find({ _id: req.body._id }).populate("Course")
        res.status(200).json({ announcement })
    }












}