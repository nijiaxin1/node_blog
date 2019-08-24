const http = require('http')
const server = http.createServer((req, resp) => {
    if (req.method === 'POST') {
        console.info('content-type', req.headers['content-type'])
        let postData = ""
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end',()=>{
            console.info(postData);
            resp.end(postData)
        })
    }
}).listen(9090)

