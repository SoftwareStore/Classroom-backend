const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;

const lib = require('./Test/TestData/Users');
const User = require("./Models/User/userModel");


// Iniciamos Express
const app = express();


//settings
app.set('port', process.env.PORT || 5000);
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // <-- modificado para conectar con react


//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({ 
  secret: "mysecretsession", 
  resave: false, 
  saveUninitialized: false
})
);
app.use(passport.initialize());
app.use(passport.session());
require('./Passport/passportConfig');


//RUTAS
const userRoutes = require('./Routes/User/userRoute');
const courseRoutes = require('./Routes/Course/courseRoute');
const homeworkRoutes = require('./Routes/Homework/homeworkRoute');
const announcementRoutes = require('./Routes/Announcement/announcementRoute');

app.use('/api/user', userRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/homework', homeworkRoutes);
app.use('/api/announcement', announcementRoutes);


//DATABASE
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://hasser:eo8ENRtR8lnASuv8@cluster0.9awkq.mongodb.net/classroom', { useNewUrlParser: true }).then(db => console.log('db is connected')).catch(err => console.log(err));


//start server
app.listen(app.get('port'), () => {
  // try { lib.createUsers(); } catch (e) { console.log(e) }

  //  console.log('server on port',app.get('port'));
  //  cron.schedule('*/1 * * * *', () => {
  //     lib.getData();
  //      console.log("Running task");
  //   });


});