const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const resExamSchema = new Schema({
    correctPoints: Number,
    numberOfCorrectAnswers: Number,
    numberOfIncorrectAnswers: Number,
    numberOfQuestions: Number,
    totalPoints: Number,
    course: {type:Schema.Types.ObjectId,ref:"course"},
    user:{type:Schema.Types.ObjectId,ref:"user"}
  
});


const ResExam = mongoose.model('resexam', resExamSchema);
module.exports = ResExam;