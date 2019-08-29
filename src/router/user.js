const url = require('url')
const querystring = require('querystring')
const {SuccessModel, ErrorModel} = require('../model/resultModel')
const {loginCheck} = require('../controller/user')


const handleUserRouter = (req, resp) => {
    const method = req.method
    const urlObj = url.parse(req.url)
    const pathname = urlObj.pathname


    if (method === 'POST' && pathname === '/api/user/login') {

        const {username, password} = req.body
        const result = loginCheck(username, password)
        return result.then(data => {
            if (data.username) {
                req.session.username = data.username
                req.session.realname = data.realname
                return new SuccessModel();
            }
            return new ErrorModel("登陆失败")
        })
    }


    if (method === 'GET' && pathname === '/api/user/list') {
        return {
            msg: '获取用户列表接口'
        }
    }


    if (method === 'GET' && pathname === '/api/user/detail') {
        return {
            msg: '获取用户详情接口'
        }
    }

    if (method === 'POST' && pathname === '/api/user/new') {
        return {
            msg: '新建用户接口'
        }
    }

    if (method === 'POST' && pathname === '/api/user/update') {
        return {
            msg: '更细用户接口'
        }
    }

    if (method === 'POST' && pathname === '/api/user/delete') {
        return {
            msg: '删除用户接口'
        }
    }
}
module.exports = handleUserRouter