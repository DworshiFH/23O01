const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoute = require('./auth');
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
app.use(express.static("Frontend"));
app.use(express.static("/"));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
    })
);
app.use('/', authRoute);
app.use('/', eventRoute);


app.listen(3000, () => console.log('Server up and Running!'));

