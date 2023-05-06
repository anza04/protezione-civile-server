const { createConnection } = require('mysql');

const dbMysql = createConnection({
    host: "sql780.main-hosting.eu",
    user: "u221049142_pc",
    password: "protezione_civile_5INF2",
    database:"u221049142_anagrafiche_pc" 
});

module.exports = {dbMysql}