const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoute = require('./Routes/auth');
const postRoute = require('./Routes/posts');
const dotenv = require('dotenv');

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
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(3000, () => console.log('Server up and Running!'));