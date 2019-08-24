const http = require('http')
const querystring = require('querystring')


let server = http.createServer((req, resp) => {
    console.info(req.method);
    console.info(req.url)
    console.info(querystring.decode(req.url))
    resp.end(querystring.encode(querystring.decode(req.url)))
})

server.listen(80)