const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportSetup = require('../config/passport-setup')
const keys = require('../config/keys')
const cookieSession = require('cookie-session')

const lib = require('./Test/TestData/Users');

// Iniciamos Express
const app = express();

//settings
app.set('port', process.env.PORT || 5000);
//app.use(cors({ origin: "http://localhost:3000", credentials: true })); // <-- modificado para conectar con react
app.use(cors({
  origin: function(origin, callback){
    return callback(null, true);
  },
  optionsSuccessStatus: 200,
  credentials: true
}));


//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(session({ 
  cookie: {
    maxAge: 1000 * 60 * 60 * 60,
    sameSite: 'none',
    secure: true
  },
  proxy: true,
  httpOnly: true,
  secret: 'miClaveFavorite',
  resave: true,
  saveUninitialized: true
})
);
app.use(passport.initialize());
app.use(passport.session());
require('./Passport/passportConfig');

//RUTAS
const authRoutes = require('./Routes/Auth-routes/auth-routes');
const userRoutes = require('./Routes/User/userRoute');
const courseRoutes = require('./Routes/Course/courseRoute');
const homeworkRoutes = require('./Routes/Homework/homeworkRoute');
const announcementRoutes = require('./Routes/Announcement/announcementRoute');
const examRoutes = require('./Routes/Exam/examRoute');
const responExamRoutes = require('./Routes/Exam/responExam');

app.use('/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/homework', homeworkRoutes);
app.use('/api/announcement', announcementRoutes);
app.use('/api/exam', examRoutes);
app.use('/api/respon',responExamRoutes);
// //settings2
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser("secretcode"));


// //Agregado*****************************
// const authRoutes = require('./Routes/Auth-routes/auth-routes');
// const passportSetup = require('../config/passport-setup')
// const keys = require('../config/keys')
// const cookieSession = require('cookie-session')
// // set view engine
app.set('view engine', 'ejs');
// // usando Cookies
// app.use(cookieSession({
//   maxAge: 24*60*60*1000,
//   keys: [keys.session.cookieKey]
// }))
// //*****************************






// //Agregado**********************
// // set up routes
// app.use('/auth', authRoutes);

// // create home route
app.get('/', (req, res) => {
    res.render('home');
});
// //*****************************


//DATABASE
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true }).then(db => console.log('db is connected')).catch(err => console.log(err));

//start server
app.listen(app.get('port'), () => {
  // try { lib.createUsers(); } catch (e) { console.log(e) }

  //  console.log('server on port',app.get('port'));
  //  cron.schedule('*/1 * * * *', () => {
  //     lib.getData();
  //      console.log("Running task");
  //   });


});