const redis = require('redis')
const {REDIS_CONF} = require('../conf/db')


const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)


redisClient.on('error', err => {
    console.info(err)
})

function set(key, val) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
        redisClient.set(key, val.toString(), redis.print)
    }
}

function get() {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            console.info('val', val)

            if (val == null) {
                resolve(null)
                return
            }

            try {
                resolve(JSON.parse(val))
            } catch (e) {
                resolve(val)
            }
        })
    })
}

module.exports = {
    get, set
}