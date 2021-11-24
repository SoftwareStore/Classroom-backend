const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const {User} = require('../User/userModel');
const examSchema = new Schema({
    Questions: String,
    Answers: String,
    Grade: Number,
    //Code: { type: String, unique: 'El codigo ({VALUE}) ya esta en uso.' },
    Name: String,
    //TypeOfCourse: String,
    Course: [{ type: Schema.Types.ObjectId, ref: "course" }],
    //homeworks: [{ type: Schema.Types.ObjectId, ref: "homework" }],
    //announcements: [{ type: Schema.Types.ObjectId, ref: "announcement" }]
    Start: String,
    End: String

});

const Exam = mongoose.model('exam', examSchema);
module.exports = Exam;