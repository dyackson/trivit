const mongoose = require('mongoose');

const question_schema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['single', 'multiple', 'true_false', 'order'],
    },
    prompt:  {type: String, required: true, trim: true},
    choices: [String],
    answer:  {type: mongoose.Mixed, required: true},
    tags: [String],
    links: [String],
    // a user id
    creator: String,
}, {
    // mongoose will manage the created_at and updated_at fields
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});

const Question = mongoose.model('Question', questionSchema);

Object.assign(module.exports, {
    Question,
});

async function create_question(fields) {
    return await new Question(fields).save();
}

async function update_question(question) {
}

async function get_questions({
    tags,
    from_date,
    to_date,
    creator,
    types,
}) (
)



