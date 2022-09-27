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

mongoose.connect('mongodb://localhost/MongooseDashboard', {useNewUrlParser: true});
const MongooseDashboardSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    }
})
const MongooseDashboard = mongoose.model('MongooseDashboard', MongooseDashboardSchema);

app.get('/', (req, res) => {
    MongooseDashboard.find()
        .then(data => res.render("index", {mongeese: data}))
        .catch(err => res.removeListener(err));
})

app.get('/mongeese/new', (req, res) => {
    res.render("newMongoose");
})

app.get('/mongeese/edit/:id', (req, res) => {
    MongooseDashboard.find({_id: req.params.id})
        .then((foundMongoose) => {
            console.log(foundMongoose);
            res.render("editMongoose", {mongoose: foundMongoose[0] });
        })
        .catch((err) => {
            console.log(err)
        })
})

app.post('/mongeese/:id', (req, res) => {
    MongooseDashboard.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then((editedMongoose) => {
            console.log(editedMongoose);
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/mongoose/:id', (req, res) => {
    MongooseDashboard.findById({_id: req.params.id})
        .then((mongoose) => {
            console.log("mongoose ", mongoose);
            res.render("singleMongoose", {mongoose: mongoose})
        })
        .catch((err) => {
            console.log(err)
        })
})

app.post('/mongeese/delete/:id', (req, res) => {
    MongooseDashboard.findByIdAndDelete({_id: req.params.id})
        .then((deletedMongoose) => {
            console.log("deleted ", deletedMongoose);
            res.redirect('/');
        })
        .catch(err => console.log(err));
})

app.post('/mongeese', (req, res) => {
    const mongoose = new MongooseDashboard(req.body)
    mongoose.save()
        .then(newMongoose => {
            console.log("Mongoose Created : ", newMongoose);
            res.redirect('/');
        })
        .catch(err => {
            for(var key in err.errors) {
                req.flash('mongooseErrors', err.errors[key].message);
                res.redirect('/')
            }
        })
})





const port = 8000;
app.listen(port, () => {console.log(`Listening on port: ${port}`)});