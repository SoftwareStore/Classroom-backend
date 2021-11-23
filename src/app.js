const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const lib = require('./Test/TestData/Users');
const app = express();
const User = require("./Models/User/userModel");

//Agregado*****************************
const authRoutes = require('./Routes/Auth-routes/auth-routes');
const passportSetup = require('../config/passport-setup')
const keys = require('../config/keys')
const cookieSession = require('cookie-session')
// set view engine
app.set('view engine', 'ejs');
// usando Cookies
app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys: [keys.session.cookieKey]
}))
//*****************************

//settings
app.set('port', process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true })); // <-- modificado para conectar con react
app.use(
  session({ 
    secret: "secretCode", 
    resave: true, 
    saveUninitialized: true
  })
);
app.use(morgan('dev'));
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);
// app.use(cors());
// app.use(express.json());
// app.use(cookieParser())
// app.use(cors({ origin: [process.env.CLIENT_URL], credentials: true }));

//RUTAS
const userRoutes = require('./Routes/User/userRoute');
const courseRoutes = require('./Routes/Course/courseRoute');
const homeworkRoutes = require('./Routes/Homework/homeworkRoute');
const announcementRoutes = require('./Routes/Announcement/announcementRoute');

app.use('/api/user', userRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/homework', homeworkRoutes);
app.use('/api/announcement', announcementRoutes);

//         Login
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, email, info) => {
    if (err) throw err;
    if (!email) res.send("No Existe el Email");
    else {
      req.logIn(email, (err) => {
        if (err) throw err;
        res.send("Autenticado Exitosamente");
        console.log(req.email);
      });
    }
  })(req, res, next);
});

//         Registro
app.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("Email Ya existe");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
      });
      await newUser.save();
      res.send("User Creado");
    }
  });
});

//         User
app.get("/user", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});


//DATABASE
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://hasser:eo8ENRtR8lnASuv8@cluster0.9awkq.mongodb.net/classroom', { useNewUrlParser: true }).then(db => console.log('db is connected')).catch(err => console.log(err));

//Agregado**********************
// set up routes
app.use('/auth', authRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('home');
});
//*****************************

//middlewares

app.use(express.urlencoded({
    extended: true
  }));


//start server
app.listen(app.get('port'), () => {
  // try { lib.createUsers(); } catch (e) { console.log(e) }

  //  console.log('server on port',app.get('port'));
  //  cron.schedule('*/1 * * * *', () => {
  //     lib.getData();
  //      console.log("Running task");
  //   });


});