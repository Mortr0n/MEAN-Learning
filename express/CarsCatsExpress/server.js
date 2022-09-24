const express = require('express');
const app = express();

app.use(express.static(__dirname + '/static'));

app.set('views', `${__dirname}/static/views`)
app.set('view engine', 'ejs');

app.get('/cars', function(req, res) {
    res.render('cars');
})

app.get('/cats', function(req, res) {
    res.render('cats');
})

app.get('/cars/new', function(req, res) {
    res.render('newCar');
})

const port = 8000;
app.listen(port, function() {
    console.log(`Listening on port: ${port}`);
})