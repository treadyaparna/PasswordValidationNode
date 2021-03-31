var http        = require("http");
var express     = require('express');
const fs        = require('fs')
var bodyParser  = require('body-parser')
var app         = express();
var pool        = require('./database')();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
const dotenv = require('dotenv');
dotenv.config();

//rest api to create a new record into mysql database
app.post('/', function (req, res) {
    let errorStatus = 0;

    //empty validation
    var postData = req.body;
    let password = req.body.password;
    if (password == '') {
        res.status(400);
        res.json("Password can't be empty");
    }

    //regularExpression read from papassword.json and validate
    var data = fs.readFileSync('password.json', 'utf8');
    let regularExpressions = JSON.parse(data);
    for (let regularExpression of regularExpressions) {
        let regex = new RegExp(regularExpression.regularExpression, 'g');
        if (!password.match(regex)) {
            errorStatus = 1;
            res.status(400);
            res.json({statusMessage:regularExpression.errorMessage});
            break;
        }
    }

    //sent success response
    if (errorStatus == 0) {
        res.status(204);
        res.json({statusMessage:"success"});
    }

});



var server = app.listen(process.env.port,process.env.host, function () {
    let host = server.address().address
    let port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port);
});