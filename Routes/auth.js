const router = require('express').Router();
const User = require('../Model/User');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');

//REGISTER
router.post('/register', async (req, res) => {
    //Validation
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if the user already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('This email is already registered!');

    //Check if passwords are the same
    if(req.body.password !== req.body.passwordconfirm) return res.status(400).send('The passwords do not match!');

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
        res.status(400).send(err);
    }
});


//LOGIN
router.post('/login', async (req, res) => {
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if the user already in the database
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Incorrect Email or Password!');

    //Check if password is valid
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Incorrect Email or Password!');

    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});


module.exports = router;