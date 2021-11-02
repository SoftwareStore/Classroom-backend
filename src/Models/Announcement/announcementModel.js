const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const announcementSchema = new Schema({
    Title: String,
    Description: String,
    Submit:Date,
    Course: { type: Schema.Types.ObjectId, ref: "course" }
})

const Announcement = mongoose.model('announcement', announcementSchema);
module.exports = Announcement;
