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

const Question = mongoose.model('Question', question_schema);

module.exports = {
    create_question,
    update_question,
    get_question_by_id,
    find_questions,
};

async function create_question(question) {
    const created_question = await new Question(question).save();
    return created_question.id;
}

async function update_question(question) {
    const {id} = question;
    const {nModified} = await Question.updateOne({id}, question);
    if (!nModified) {
        throw Error(`failed to update question for id ${id}`);
    }
}
async function get_question_by_id(id) {
    // lean means return a regular js object, no a Document
    return await Question.findById(id).lean().exec();
}

async function find_questions({
    // tags are OR'd together, if present
    tags,
    from_date,
    to_date,
    creator,
    types,
}) {
    const query = Question.find();

    if (tags.length) {
        query.where('tags').in(tags);
    }
    if (from_date) {
        query.where('created_at').gte(from_date);
    }
    if (to_date) {
        query.where('created_at').lte(to_date);
    }
    if (creator) {
        query.where({creator})
    }
    if (type) {
        query.where({type})
    }

    return await query.lean().exec();
}



