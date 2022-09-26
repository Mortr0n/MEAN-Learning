const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('express-flash')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(flash());
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './static/views'));

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

app.get('/', function(req, res) {
    User.find()
        .then(data => res.render("index", {users: data}))
        .catch(err => res.json(err));
})

app.post('/users', (req, res) => {
    console.log(req.body.name, req.body.age);
    const user = new User(req.body);

    user.save()
        .then(newUserData => console.log("user created: ", newUserData))
        .catch(err => {
            console.log("Error : ", err);
            for(let key in err.errors) {
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/');
        });

    res.redirect('/');
})

// another way of doing this.  The long way.
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