const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const {User} = require('../User/userModel');
const courseSchema = new Schema({
    Code:String,
    Name: String,
    TypeOfCourse: String,
    participants: [{ type: Schema.Types.ObjectId,ref:"user" }],
    homeworks:[{type:Schema.Types.ObjectId,ref:"homework"}]

});

const Course = mongoose.model('course', courseSchema);
module.exports = Course;