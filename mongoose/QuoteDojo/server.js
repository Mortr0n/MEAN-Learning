const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './static/views'));
app.set("view engine", 'ejs');
app.use(session({secret: 'secret-sauce'}));
app.use(flash());

mongoose.connect('mongodb://localhost/QuotingDojo', { useNewUrlParser: true });
const QuoteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    quote: {
        type: String,
        required: true,
        minlength: 5
    }
}, { timestamps: true})
const Quote = mongoose.model('Quote', QuoteSchema);

app.get('/', (req, res) => {

    Quote.find()
        .then(data => res.render("index", {quotes: data}))
        .catch(err => res.json(err));
})

const port = 8000;
app.listen(port, () => {console.log(`Listening on port: ${port}`)});