const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Task', 
    {useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => console.log(`Established connection to the database`))
    .catch(() =>  console.log(`Something has gone wrong with the connection to the database`));