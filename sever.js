












app.use(session({secret: "password"})) //TODO make randomly generated secret



viewRoutes.post('/login', function (req, res) {
    if (!req.body.id || !req.body.password) {
        res.sendFile(path.join(__dirname, "../login.html"));
    } else {
        Users.filter(function (user) {
            if (user.id === req.body.id && user.password === req.body.password) {
                req.session.user = req.body.id;
                console.log(req.session.user);
                res.send("logged in");
            } else {
                res.send("Invalid credentials!");
            }
        });
    }
});

viewRoutes.get('/logout', function (req, res){
    res.send("By" + req.body.id + sess.id);
    req.session.destroy( function () {
        console.log("user logged out");
    })
})
