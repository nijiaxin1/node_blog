//const env = process.env.NODE_ENV
const env = 'dev'

let MYSQL_CONF

if (env === 'dev') {
    MYSQL_CONF = {
        host: '192.168.0.106',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'blog'
    }
}

if (env === 'production') {
    MYSQL_CONF = {
        host: '192.168.0.106',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'blog'
    }
}


module.exports = MYSQL_CONF
