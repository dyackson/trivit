const answered_question_schema = ({
    // maybe this is an objectid
    question_id: String,
    date: {type: Date, default: Date.now},
});

const user_schema = ({
    user_id: {
        type: String,
        required: true,
    },
    // maybe this is an objectid
    favorites: [String],
    answered: [answered_question],
});


Object.assign(module.exports, {
    // User,
});
