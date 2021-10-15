const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    age: Number,
    email: { type: String, unique: 'El email ({VALUE}) ya esta en uso.' },
    password: {
        type: String,
        select: false
    },
    role: String,
    courses: [{ type: Schema.Types.ObjectId, ref: "course" }]
});

const User = mongoose.model('user', userSchema);
module.exports = User;