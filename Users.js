var mysql = require("mysql2");
var bcrypt = require("./bcrypt");

const pw = "123456";

const hashedPassword = bcrypt.hash(pw);

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "R!!ddxxx5",
    port: "3306",
    database: "users"
});

con.connect(function (err){
    if(err)
        throw err;
    console.log("Connected!");
    //var sql = "CREATE TABLE users (id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, firstName VARCHAR(255) NOT NULL, lastName VARCHAR(255) NOT NULL, emailAddress VARCHAR(255) NOT NULL UNIQUE KEY , birthday DATE NOT NULL, password VARCHAR(255) NOT NULL)";
    var sql = "INSERT INTO users (firstName, lastName, emailAddress, birthday, password) VALUES ('Richard', 'Cox', 'richard.cox4@gmail.com', '2001.09.09', '" + hashedPassword + "')";
    con.query(sql, function (err, result){
        if(err)
            throw err;
        console.log("Table created!");
    });
});