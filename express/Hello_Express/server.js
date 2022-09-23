const express = require('express');

const app = express();
app.use(express.static(__dirname + '/static'));
console.log("__dirname", __dirname);

app.get('/', function(req, res) {
    res.send("<h1>Hello Express<h1>");
})



const port = 8000;
app.listen(port, function() {
    console.log(`Listening on port: ${port}`);
})