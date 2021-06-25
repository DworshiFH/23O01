const router = require('express').Router();
const User = require('./Model/User');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('./validation');
const bcrypt = require('bcryptjs');
const verify = require('./Routes/verifyToken');
const loggedIn = require('./Routes/loggedIn');
const path = require('path');

//REGISTER
router.post('/user/register', async (req, res) => {
    //Validation
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if the user already in the database
    console.log(req.body);
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('This email is already registered!');

    //Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create new user
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send('Added user with ID: ' + user._id);
    }
    catch(err){
        console.log("test");
        res.status(400).send(err);
    }
});

router.get('/register', loggedIn, async (req, res) => {
    res.sendFile(path.join(__dirname, './Frontend/signup.html'));
});


//LOGIN
router.post('/user/login', async (req, res) => {
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if the user is already in the database
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Incorrect Email or Password!');

    //Check if password is valid
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Incorrect Email or Password!');

    //Assing values to the session
    req.session.userID = user._id;
    req.session.isAuth = true;

    return res.json({status: 'ok', id: user._id});
});

router.get('/login', loggedIn, async (req, res) => {
    res.sendFile(path.join(__dirname, "./Frontend/login.html"));
})

//LOGOUT
router.post('/user/logout', async (req, res) => {
    req.session.destroy((err) =>{
        if(err) throw err;
        res.redirect('/');
    });
})

//Get User by id
router.get('/user/:id', async(req, res) => {
    try{
    const user = await User.findById(req.params.id);
    if(!user) return res.status(400).send('User not found!');

    res.json({firstname: user.firstname, lastname: user.lastname, email: user.email, password: user.password});
    }
    catch(error){
        return res.status(400).send(error);
    }
})

router.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, './Frontend/main.html'));
})

router.get('/myprofile', verify, (req, res) =>{
    res.sendFile(path.join(__dirname, './Frontend/profile.html'))
})

module.exports = router;