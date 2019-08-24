const mysql = require('mysql')

const conn = mysql.createConnection({
    host: '192.168.0.106',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'blog'
})

conn.connect()

const sql = 'select * from users';

conn.query(sql, (err, result) => {
    if (err) {
        console.info(err)
        return
    }
    console.info(result)
});

conn.end()