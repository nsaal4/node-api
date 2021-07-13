const fs = require('fs')

// write data to a json file
function writeDataToFile(fileName, content) {
    fs.writeFileSync(fileName, JSON.stringify(content), (error) => {
        if (error) {
            console.log(error)
        }
    })
}

// get data from a request body
function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = ''
            req.on('data', (data) => {
                body += data.toString()
            })
    
            req.on('end', async () => {
                resolve(body)
            }) 
        } catch (error) {
            resolve(error)
        }
    })
}

module.exports = {
    writeDataToFile,
    getPostData
}