const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoute = require('./Routes/auth');
const eventRoute = require('./Routes/events');
const dotenv = require('dotenv');
const session = require('express-session');

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, res) {
    try{
        console.log('Connected to DB!')
    }
    catch (err){
        throw err;
    }
});

app.use(express.json());
app.use('/user', authRoute);
app.use('/event', eventRoute);
app.use(session({secret: process.env.SESSION_SECRET, saveUninitialized: true, resave: true}));
app.use(express.static("Frontend"));

app.listen(3000, () => console.log('Server up and Running!'));