const redis = require('redis')

const redisClient = redis.createClient(6379, '192.168.0.106')

redisClient.on('error', err => {
    console.info(err)
})


redisClient.set('myname', 'zhangshan', redis.print)
redisClient.get('myname', (err, val) => {
    if (err) {
        console.info(err)
        return
    }
    console.info('val', val)
    redisClient.quit()
})