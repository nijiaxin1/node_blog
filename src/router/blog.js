const url = require('url')
const querystring = require('querystring')
const {getList, getDetail, newBlog, updateBlog, deleteBlog} = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resultModel')

const handleBlogRouter = (req, resp) => {
    const method = req.method

    const urlObj = url.parse(req.url)
    const pathname = urlObj.pathname


    if (method === 'GET' && pathname === '/api/blog/list') {
        const query = querystring.parse(urlObj.query)
        const author = query.author || ''
        const keyword = query.keyword || ''

        const result = getList(author, keyword)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }


    if (method === 'GET' && pathname === '/api/blog/detail') {
        const query = querystring.parse(urlObj.query)
        const result = getDetail(query.id)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    if (method === 'POST' && pathname === '/api/blog/new') {
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    if (method === 'POST' && pathname === '/api/blog/update') {
        const result = updateBlog(req.body.id, req.body)
        return result.then(data => {
            if(data){
                return new SuccessModel();
            }else{
                return new ErrorModel('更新博客失败!!!');
            }
        })
    }

    if (method === 'POST' && pathname === '/api/blog/delete') {
        const result = deleteBlog(req.body.id)
        return result.then(data => {
            if(data){
                return new SuccessModel();
            }else{
                return new ErrorModel('删除新博客失败!!!');
            }
        })
    }
}
module.exports = handleBlogRouter