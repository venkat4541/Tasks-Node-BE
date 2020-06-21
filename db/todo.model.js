const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({
    title: {
        type: String
    },
    user: {
        type: String
    },
    priority: {
        type: String
    },
    completed: {
        type: Boolean
    }
});

module.exports = mongoose.model('Todo', Todo);