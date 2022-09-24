let express = require('express');

let app = express();

app.use(express.static(__dirname + '/static'));
console.log("__dirname", __dirname);

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
    res.send("<h1>Hello Express<h1>");
})

app.get("/users", function(req, res) {
    var usersArr = [
        {name: "Michael", email: "michael@codingdojo.com"}, 
        {name: "Jay", email: "jay@codingdojo.com"}, 
        {name: "Brendan", email: "brendan@codingdojo.com"}, 
        {name: "Andrew", email: "andrew@codingdojo.com"}
    ];
    res.render('users', {users: usersArr});
})



const port = 8000;
app.listen(port, function() {
    console.log(`Listening on port: ${port}`);
})