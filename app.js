const url = require('url')
const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const {SuccessModel, ErrorModel} = require('./src/model/resultModel')
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method != 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] != 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })
    return promise
}
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString();
}
const SESSION_DATA = {}
const serverHandler = (req, resp) => {
    resp.setHeader('Content-type', 'application/json')

    const urlObj = url.parse(req.url)
    const pathname = urlObj.pathname

    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const value = arr[1].trim()
        req.cookie[key] = value
    })
    let needSetSession = false
    let userId = req.cookie.userid
    //解析session
    if (userId) {
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {}
        }
    } else {
        needSetSession = true
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId]
    if (needSetSession) {
        resp.setHeader('Set-Cookie', `userid=${userId};path=/; httpOnly; expires=${getCookieExpires()}`)
    }

    if (pathname != '/api/user/login' && !req.session.username) {
        resp.end(JSON.stringify(new ErrorModel("请先登录!!")));
        return
    } /*else {
        resp.end(JSON.stringify(new SuccessModel(req.session.username)));
        return
    }*/


    getPostData(req).then(postData => {
        req.body = postData

        const blogResult = handleBlogRouter(req, resp)
        if (blogResult) {
            blogResult.then((blogData) => {
                resp.end(JSON.stringify(blogData))
            })
            return;
        }


        const userResult = handleUserRouter(req, resp);
        if (userResult) {
            userResult.then((userData => {
                resp.end(JSON.stringify(userData))
            }))
            return;
        }

        resp.writeHead(404, {"content-type": 'text/plain'})
        resp.write("404 NOT FOUND")
        resp.end()
    })
}

module.exports = serverHandler