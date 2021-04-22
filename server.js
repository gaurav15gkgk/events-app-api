//dependencies required 
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require("express-validator")
const fs = require('fs')


// declared routes 
const eventRoute = require('./routes/event')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')

const app = express();
require('dotenv').config()

//middlewares
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(expressValidator())
app.use(cookieParser())

//use Routes
app.use('/',eventRoute)
app.use('/', authRoute)
app.use('/', userRoute)

//to handle Unauthorized error
app.use(function (err, req, res, next) {
    if (err.name == 'UnauthorizedError') {
      res.status(401).json({
          error: "Unauthorized User"
      });
    }
  
  });

// to show the apidocs on '/' path
app.get('/', (req, res) => {
    fs.readFile('docs/apiDocs.json', (err, data) => {
        if (err) {
            res.status(400).json({
                error: err
            });
        }
        const docs = JSON.parse(data);
        res.json(docs);
    });
});

// mongodb connection 
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
    .then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);
});

// port selection and initialized the server
app.listen('8080', () => {
    console.log('Server started on http://localhost:8080')
})



