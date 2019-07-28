const mongoose = require('mongoose');

const answered_question_schema = new mongoose.Schema({
    // maybe this is an objectid
    question_id: String,
    date: {type: Date, default: Date.now},
});

const user_schema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    // maybe this is an objectid
    favorites: [String],
    answered: [answered_question],
});

const User = mongoose.model('User', user_schema);

Object.assign(module.exports, {
    User,
});
