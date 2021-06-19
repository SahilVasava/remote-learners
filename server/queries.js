const Pool = require('pg').Pool
const pool = new Pool({
    user: 'sahil_vasava',
    host: 'localhost',
    database: 'tolearn',
    password: 'password',
    port: 5432,
})