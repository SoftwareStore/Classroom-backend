const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser")
const app = express();

//settings

app.set('port', process.env.PORT || 5000);
app.use(cors())
app.use(express.json());
app.use(cookieParser())
// app.use(cors({ origin: [process.env.CLIENT_URL], credentials: true }));

//RUTAS
const userRoutes = require('./Routes/User/userRoute');
const courseRoutes = require('./Routes/Course/courseRoute');

app.use('/api/user', userRoutes);
app.use('/api/course', courseRoutes);

//DATABASE
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://hasser:eo8ENRtR8lnASuv8@cluster0.9awkq.mongodb.net/classroom', { useNewUrlParser: true }).then(db => console.log('db is connected')).catch(err => console.log(err));


//middlewares
app.use(morgan('dev'));
// app.use(bodyParser.json());
// app.use(express.urlencoded({
//     extended: true
//   }));
//start server
app.listen(app.get('port'), () => {

  //  console.log('server on port',app.get('port'));
  //  cron.schedule('*/1 * * * *', () => {
  //     lib.getData();
  //      console.log("Running task");
  //   });


});