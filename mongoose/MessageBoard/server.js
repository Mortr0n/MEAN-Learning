const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './static/views'));
app.set('view engine', 'ejs');
app.use(session({secret: 'secret-word'}));
app.use(flash());

mongoose.connect('mongodb://localhost/MessageBoard', {useNewUrlParser: true});

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: [true, 'You must enter a comment']
    },
    name: {
        type: String,
    },
    messageId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Message'}
}, {timestamps: true})

const MessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: [true, 'You must enter a message']
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Comment'
        }
    ]
}, {timestamps: true})


const Comment = mongoose.model('Comment', CommentSchema);
const Message = mongoose.model('Message', MessageSchema);

app.get('/', (req, res) => {
    // populate is kind of a big deal here!
    Message.find().populate('comments')
        .then(data => res.render("index", {messages: data}))
        .catch(err => console.log(err));
})

app.post('/message/new', (req, res) => {
    Message.create(req.body)
        .then((newMessage) => {
            console.log("New Message : ", newMessage);
            res.redirect('/');
        })
        .catch((err) => console.log("Error creating message ", err));
})

app.post('/comment/new/:messageId', (req, res) => {
    Comment.create(req.body)
        .then((newComment) => {
            console.log("New Comment ", newComment)
            Message.findByIdAndUpdate(
                {_id: req.params.messageId}, 
                {$push: {comments: newComment}}, 
                {
                    new: true, 
                    useFindAndModify: false
                })
                .then((data) => {
                    console.log("Data is ", data);
                    res.redirect('/');
                })
                .catch((err) => {
                    console.log("Error adding comment to message ", err);
                })
        })
        .catch((err) =>  console.log("Error creating comment ", err));
})




app.get('/', (req, res) => {
    res.render("index");
})













const port = 8000;
app.listen(port, () => {console.log(`Listening on port: ${port}`)});