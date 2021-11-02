const User = require('../../Models/User/userModel');
const Homework = require('../../Models/Homework/homeworkModel');
const Course = require('../../Models/Course/courseModel');
const { Mongoose } = require('mongoose');
function createUsers() {
    const student1 = new User({
        // _id: new Mongoose.Types.ObjectId(),
        firstName: "Ian",
        lastName: "Fleming",
        age: 21,
        email: "1@mail.com",
        role: "Student"
    })
    const student2 = new User({
        // _id: new Mongoose.Types.ObjectId(),
        firstName: "Luis",
        lastName: "Matute",
        age: 22,
        email: "2@mail.com",
        role: "Student"
    })

    const student3 = new User({
        // _id: new Mongoose.Types.ObjectId(),
        firstName: "Jean",
        lastName: "Jhonson",
        age: 19,
        email: "3@mail.com",
        role: "Student"
    })

    try {
        student1.save(function (err) {
            if (err) return handleError(err);
            console.log("student1 created")
        })
        student2.save(function (err) {
            if (err) return handleError(err);
            console.log("student2 created")
        })
        student3.save(function (err) {
            if (err) return handleError(err);
            console.log("student3 created")
        })
    } catch {
        console.log("Usuarios existentes")
    }

}
module.exports = { createUsers }