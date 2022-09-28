const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    quote: {
        type: String,
        required: true,
        minlength: 5
    }
}, { timestamps: true})

module.exports = mongoose.model('Quote', QuoteSchema);