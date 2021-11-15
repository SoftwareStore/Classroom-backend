const passport = require('passport');
const bcrypt = require('bcryptjs');
const localStrategy = require("passport-local").Strategy;

// Modulo de usuario
const User = require("../Models/User/userModel");

passport.use('localRegister', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({ 'email': email })
  if (user) {
    return done(null, false);
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: email,
      password: hashedPassword,
      role: req.body.role
    });

    // newUser.firstName = req.body.firstName;
    // newUser.lastName = req.body.lastName;
    // newUser.age = req.body.age;
    // newUser.email = email;
    // newUser.password = hashedPassword;
    // newUser.role = req.body.role;
    await newUser.save();
    done(null, newUser);
  }
}));

passport.use('localLogin', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.findOne({ email: email });
  if (!user) {
    return done(null, false);
  }
  if (!user.comparePassword(password)) {
    return done(null, false);
  }
  return done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});