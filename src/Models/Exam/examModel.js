const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const examSchema = new Schema({
    // Questions: [String],
    // ChosenAnswers: [String],
    // CorrectAnswers: [String],
    // Alternatives: [[String]],
    // Grade: Number,
    // Name: String,
    // Course: [{ type: Schema.Types.ObjectId, ref: "course" }],
    // Start: Date,
    // End: Date

    quizTitle: String,
    quizSynopsis: String,
    answerSelectionType:String,
    questions: [{
        question: String,
        answerSelectionType: String,
        answers: [String],
        correctAnswer: String,
        messageForCorrectAnswer: String,
        messageForIncorrectAnswer: String,
        explanation: String,
        point: String
    }],


});

const Exam = mongoose.model('exam', examSchema);
module.exports = Exam;