var http = require("http");
var express = require('express');
const fs = require('fs');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
var pool = require('./database')();
var Promise = require("bluebird");
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

const dotenv = require('dotenv');
const { json } = require("body-parser");
dotenv.config();

let con = pool.getConnection(function (err, con) {
    con.query('SELECT * FROM passwords', function (err, rows) {

        if (!err) {
            for (let row of rows) {

                let pass = row.password;
                let serverAdd = `http://${process.env.host}:${process.env.port}/ `;
                request.post(
                    serverAdd,
                    { json: { password: pass } },
                    function (error, response, body) {
                        let status = 0;
                        if (response.statusCode == '204') {
                            status = 1;
                            console.log("Success!");
                        }
                        else {
                            console.log("Error Message: " + body.statusMessage);
                        }
                        let updateQuery = "update passwords SET valid='" + status + "' WHERE password='" + pass + "'";
                        con.query(updateQuery, function (error, results, fields) {
                            if (error) throw error;
                        });
                    });

            }

        }
        else {
            console.log(err);
        }
        con.release();
    });
});



