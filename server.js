const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const eventRoute = require('./routes/event')


const app = express();
require('dotenv').config()
app.use(bodyParser.json())
app.use(morgan('tiny'))

app.use('/',eventRoute)

app.get('/', (req, res) => {
    res.send('Hello')
})



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



