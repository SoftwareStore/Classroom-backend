const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const examSchema = new Schema({
    Questions: [String],
    Answers: [String],
    Grade: Number,
    Name: String,
    Course: [{ type: Schema.Types.ObjectId, ref: "course" }],
    Start: Date,
    End: Date

});

const Exam = mongoose.model('exam', examSchema);
module.exports = Exam;