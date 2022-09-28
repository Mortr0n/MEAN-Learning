const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: [3, 'Must be 3 characters']
    },
    description: {
        type: String,
        default: "",
    },
    completed: {
        type: Boolean,
        default: false
    },
}, {timestamps: true});

module.exports = mongoose.model('Task', TaskSchema);