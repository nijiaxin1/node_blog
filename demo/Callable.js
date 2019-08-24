const fs = require('fs')
const path = require('path')


function getFileContent(fileName, callback) {
    const fullFileName = path.resolve(__dirname, 'files', fileName)
    fs.readFile(fullFileName, (err, data) => {
        if (err) {
            console.info(err)
            return
        }
        //传入函数 回调
        callback(JSON.parse(data.toString()))
    })
}

getFileContent('a.json', aData => {
    console.log('a data', aData)
    getFileContent(aData.next, bData => {
        console.log('b data', bData)
        getFileContent(bData.next, cData => {
            console.info('c data', cData)
        })
    })
})

function getFileContentPromise(fileName) {
    const fullFileName = path.resolve(__dirname, 'files', fileName)
    const promise = new Promise((resolve, reject) => {
        fs.readFile(fullFileName, (err, data) => {
            if (err) {
                console.info(err);
                return
            }
            resolve(JSON.parse(data.toString()))
        })
    })
    return promise;
}

getFileContentPromise('a.json').then(aData => {
    console.info('a data', aData)
    return getFileContentPromise(aData.next)
}).then(bData => {
    console.info('b data', bData)
    return getFileContentPromise(bData.next)
}).then(cData => {
    console.info('c Data', cData)
})