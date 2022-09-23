const http = require('http');
const fs = require('fs');
const server = http.createServer(function (req, res){
    console.log('client request URL: ', req.url);

    if(req.url === '/') {
        fs.readFile('index.html', 'utf8', function(errors, contents){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(contents);
            res.end();
        });
    } else if(req.url === '/dojo/new') {
        fs.readFile('dojo.html', 'utf8', (errors, contents) => {
            res.writeHead(200, {'Content-type': 'text/html'});
            res.write(contents);
            res.end();
        });
    }else if(req.url === '/ninjas'){
        fs.readFile('ninja.html', 'utf-8', (errors, contents) => {
            res.writeHead('200', {'Content-type': 'text/html'});
            res.write(contents);
            res.end();
        })
    } else if(req.url === '/stylesheets/style.css'){
        fs.readFile('./stylesheets/style.css', 'utf-8', (errors, contents) => {
            res.writeHead(200, {'Content-type': 'text/css'})
            res.write(contents);
            res.end();
        })
    }
    
    else {
        res.writeHead(404);
    }
});

const port = 6789
server.listen(port);

console.log(`Running on localhost port  ${port}`);