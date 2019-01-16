var options = {
    // initialization options;
};
 
var pgp = require("pg-promise")(options);
 
var connection = {
    host: 'ec2-54-163-246-159.compute-1.amazonaws.com',
    port: 5432,
    database: 'd2lcthe1gvu918',
    user: 'pdodjanxazgsqi',
    password: '53013a73b31f060d2aabda311af4403d477206ea8c340352d08b9912c0405a70'
};
 
var db = pgp(connection);
 
module.exports = db;