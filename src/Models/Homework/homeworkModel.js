const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homeworkSchema = new Schema({
    Title: String,
    Description: String,
    From: Date,
    To: Date,
    Course: { type: Schema.Types.ObjectId, ref: "course" }
})

const Homework = mongoose.model('homework', homeworkSchema);
module.exports = Homework;
