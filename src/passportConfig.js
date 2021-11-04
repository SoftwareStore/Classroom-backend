const User = require("./Models/User/userModel");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
    passport.use(
        new localStrategy((email, password, done) => {
            User.findOne({ email: email }, (err, userSchema) => {
                if (err) throw err;
                if (!userSchema) return done(null, false);
                bcrypt.compare(password, userSchema.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                        return done(null, userSchema);
                    } else {
                        return done(null, false);
                    }
                });
            });
        })
    );

    passport.serializeUser((userSchema, cb) => {
        cb(null, userSchema.id);
    });
    passport.deserializeUser((id, cb) => {
        User.findOne({ _id: id }, (err, userSchema) => {
            const userInformation = {
                email: userSchema.email,
            };
            cb(err, userInformation);
        });
    });
};
