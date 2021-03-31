var mysql       = require('mysql');  
const dotenv    = require('dotenv');
dotenv.config();

module.exports = function handle_db(req, res) {  
    var pool = mysql.createPool({  

        connectionLimit: 100,  
        host: process.env.mysql_host,  
        user: process.env.mysql_user,  
        password: process.env.mysql_password,  
        database: process.env.mysql_database

    });  

    pool.getConnection(function (err, connection) {  
        if (err) {  
            console.error("This is error msg, when connecting to db: " + err);  
            connection.release();  

            res.json({ "code": 100, "status": "Error in connecting database" });  
            return;  
        }  

        console.log("from db config: connected as id: " + connection.threadId);  
        connection.on('error', function (err) {  
            res.json({ "code": 100, "status": "Error in connection database" });  
            return;  

        });  
        return connection;  

    });  
return pool;  
}  