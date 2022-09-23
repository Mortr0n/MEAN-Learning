const http = require('http');
const fs = require('fs');
// const { isBreakStatement } = require('typescript');
const server = http.createServer(function (req, res) {
    console.log('client request URL: ', req.url)
    const splitURL = req.url.split('/');
    const fileType = splitURL[1];
    const fileName = splitURL[2];
    console.log(splitURL, fileName, fileType);
    // if(fileType === 'cars') {
    //     htmlRender(res, fileName);
    // } else if(fileType === 'images') {
    //     imageRender(res, fileName);
    // } else if(fileType === 'stylesheets') {
    //     serveCSS(res, fileName);
    // } else {
    //     res.writeHead(404);
    // }
    switch(fileType) {
        case 'stylesheets':
            serveCSS(res, fileName);
            break;
        case 'images':
            imageRender(res, fileName);
            break;
        default:
            console.log(`Default: fileType: ${fileType}, fileName: ${fileName}`)
            switch(fileType){
                case 'cars':
                    htmlRender(res, fileName, fileType);
                    break;
                case 'new':
                    htmlRender(res, fileType, fileName);
                    break;
                case 'cats':
                    htmlRender(res, fileName, fileType);
                    break;
            }
            
    }
})

const htmlRender = (res, fileName, fileType) => {
    console.log(`./views/${fileType}.html`)
    if(fileType === 'cars'){
        if(fileName === 'new'){
            fs.readFile(`./views/newCars.html`, 'utf8', (errors, contents) => {
                res.writeHead(200, {'Content-type': 'text/html'});
                res.write(contents);
                res.end();
            })
        } else {
            fs.readFile(`./views/${fileType}.html`, 'utf8', (errors, contents) => {
                res.writeHead(200, {'Content-type': 'text/html'});
                res.write(contents);
                res.end();
            })
        }    
    } else if(fileType === 'cats') {
        fs.readFile(`./views/${fileType}.html`, 'utf8', (errors, contents) => {
            res.writeHead(200, {'Content-type': 'text/html'});
            res.write(contents);
            res.end();
        })
    }
    
}

const serveCSS = (res, fileName) => {
    fs.readFile(`./stylesheets/${fileName}`, 'utf-8', function(errors, contents) {
        res.writeHead(200, {'Content-type': 'text/css'});
        res.write(contents);
        res.end();
    })
}

const imageRender = (res, fileName) => {
    console.log(`testing:  ./images/${fileName}`)
    fs.readFile(`./images/${fileName}`, function(errors, contents) {
        console.log(`./images/${fileName}`)
        if(errors) return errorResponse(res);
        res.writeHead(200, {'Content-type': 'image/jpg'});
        res.write(contents);
        res.end();
    })
}

const errorResponse = (res) => {
    console.log("Error :", res);
    return res.writeHead(404);
}

const port =6789;
server.listen(port);

console.log(`Running on localhost port ${port}`)