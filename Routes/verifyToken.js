module.exports = function (req, res, next){
    if(req.session.isAuth && req.session.userID){
        next();
    }
    else{
        res.redirect('/login');
    }


}