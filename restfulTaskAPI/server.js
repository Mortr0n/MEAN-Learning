const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const flash = require('express-flash');
const parser = require('body-parser');
const cors = require('cors');


// Remember for api you'll use express and not bodyparser
// app.use(express.json())
// in MERN you used
app.use(express.json(), express.urlencoded({ extended: true }));
// app.use(cors({
//     credentials: true,
//     origin: 
// }))


app.use(session({secret: 'secret-sauce'}));
app.use(flash());




require('./server/config/mongoose.config');
require('./server/routes/task.routes')(app);





const port = 8000;
app.listen(port, () => {console.log(`Listening on port: ${port}`)});