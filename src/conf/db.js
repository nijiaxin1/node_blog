//const env = process.env.NODE_ENV
const env = 'dev'

let MYSQL_CONF
let REDIS_CONF

if (env === 'dev') {
    MYSQL_CONF = {
        host: '192.168.0.106',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'blog'
    }

    REDIS_CONF = {
        port: 6379,
        host: '192.168.0.106'
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

    REDIS_CONF = {
        port: 6379,
        host: '192.168.0.106'
    }
}


module.exports = {MYSQL_CONF, REDIS_CONF}
