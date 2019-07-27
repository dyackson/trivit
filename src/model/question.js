const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['single', 'multiple', 'true_false', 'order'],
    },
    prompt:  {type: String, required: true, trim: true},
    choices: [String],
    answer:  {type: mongoose.Mixed, required: true},
    date: {type: Date, default: Date.now},
});

const Question = mongoose.model('Question', questionSchema);

Object.assign(module.exports, {
    Question,
});
