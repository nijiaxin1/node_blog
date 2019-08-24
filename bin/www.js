const http = require('http')
const PORT = 9090


const serverHandle = require('../app')

const server = http.createServer(serverHandle)

server.listen(PORT)
