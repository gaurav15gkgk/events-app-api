const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require("express-validator")



const eventRoute = require('./routes/event')
const authRoute = require('./routes/auth')


const app = express();
require('dotenv').config()
app.use(morgan('tiny'))
app.use(bodyParser.json())

app.use(expressValidator())
app.use(cookieParser())




app.use('/',eventRoute)
app.use('/', authRoute)

app.get('/', (req, res) => {
    res.send('Hello')
})

app.use(function (err, req, res, next) {
    if (err.name == 'UnauthorizedError') {
      res.status(401).json({
          error: "Unauthorized User"
      });
    }
  
  });




mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
    .then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);
});


app.listen('8080', () => {
    console.log('Server started on http://localhost:8080')
})



