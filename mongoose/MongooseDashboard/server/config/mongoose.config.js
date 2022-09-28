const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/MongooseDashboard', 
    {useNewUrlParser: true})
    .then(() => console.log(`Established connection to the database`))
    .catch(() =>  console.log(`Something has gone wrong with the connection to the database`));
