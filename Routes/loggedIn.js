module.exports = function (req, res, next){
    if(req.session.isAuth && req.session.userID){
        res.redirect('/myprofile');
    }
    else{
        next();
    }
}