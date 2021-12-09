const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    age: Number,
    email: { type: String, unique: 'El email ya esta en uso.' },
    password: {
        type: String,
        select: true
    },
    role: String,
    username: String,
    facebookId: String,
    googleId: String,

    role: String,


    courses: [{ type: Schema.Types.ObjectId, ref: "course" }],
    exams: [{ type: Schema.Types.ObjectId, ref: "exams" }]

});
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('user', userSchema);
module.exports = User;