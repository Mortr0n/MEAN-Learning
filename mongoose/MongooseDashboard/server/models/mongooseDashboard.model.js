const mongoose = require('mongoose');


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
module.exports = mongoose.model('MongooseDashboard', MongooseDashboardSchema);