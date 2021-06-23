const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    const authHeader = req.headers['authorization'];
    console.log('token: ', req.headers);
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) return res.status(401).send('You have to be logged in to perform this action!');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch (err){
        res.status(400).send('Invalid Token!');
    }
}