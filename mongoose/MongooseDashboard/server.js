const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');

app.use(bodyParser.urlencoded({
    extended: true
}))
// Remember for api you'll use express and not bodyparser
// app.use(express.json())
// in MERN you used
// app.use(express.json(), express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./client/static")));
app.set('views', path.join(__dirname, './client/static/views'));
app.set("view engine", 'ejs');
app.use(session({secret: 'secret-sauce'}));
app.use(flash());




require('./server/config/mongoose.config');
require('./server/routes/mongooseDashboard.routes')(app);





const port = 8000;
app.listen(port, () => {console.log(`Listening on port: ${port}`)});