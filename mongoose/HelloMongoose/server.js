const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './static/views'));
app.use(session({secret: 'secret-sauce'}));
mongoose.connect('mongodb://localhost/HelloMongoose', {useNewUrlParser: true});
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4
    },
    age: {
        type: Number,
        required: true,
        max: 120
    }
})
const User = mongoose.model('User', UserSchema);

app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './static/views'));
app.set('view engine', 'ejs');
app.use(flash());
app.get('/', function(req, res) {
    const errors = req.flash('registration')
    console.log(errors)
    User.find()
        .then(data => res.render("index", {users: data, errors: errors }))
        .catch(err => res.json(err));
})



app.post('/users', (req, res) => {
    console.log(req.body.name, req.body.age);
    const user = new User({
        name: req.body.name,
        age: req.body.age
    });
    user.save()
        .then(newUserData => {
            console.log("user created: ", newUserData);
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
            for(var key in err.errors) {
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/');
        });

})


// app.post('/users', (req, res) => {
//     console.log(req.body.name, req.body.age);
//     const user = new User();
//     user.name = req.body.name;
//     user.age = req.body.age;
//     console.log(req.body);
//     user.save()
//         .then(newUserData => console.log("user created: ", newUserData))
//         .catch(err => console.log(err));

//     res.redirect('/');
// })


const port = 8000;
app.listen(port, function() {
    console.log(`Listening on port: ${port}`);
})