const {exec} = require('../db/sql')
const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author like '${author}'%`
    }
    if (keyword) {
        sql += `and title='${keyword}'%`
    }
    return exec(sql).then(rows => {
        return rows
    })
}
const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}'`
    return exec(sql).then(rows => {
        return rows[0]
    });
}

const newBlog = (blogData = {}) => {
    const title = blogData.title
    const content = blogData.content
    const author = blogData.author
    const createTime = Date.now()

    const sql = `insert into blogs(title, content, createtime, author)
     values ('${title}','${content}','${createTime}','${author}')`

    return exec(sql).then(insertData => {
        console.log("insert data is ", insertData)
        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    const title = blogData.title
    const content = blogData.content

    const sql = `update blogs set title='${title}', content='${content}' where id = '${id}'`

    return exec(sql).then(updateDate => {
        console.info('updateDate is', updateDate);
        if (updateDate.affectedRows > 0) {
            return true
        }
        return false
    })
}

const deleteBlog = (id) => {
    const sql = `delete from blogs where id = '${id}'`

    return exec(sql).then(deleteDate => {
        console.info('updateDate is', deleteDate);
        if (deleteDate.affectedRows > 0) {
            return true
        }
        return false
    })
}


module.exports = {
    getList, getDetail, newBlog, updateBlog,deleteBlog
}