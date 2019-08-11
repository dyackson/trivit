/* global it, describe */
import get_valid_copy_of_question from '@/get_valid_copy_of_question';
import InvalidQuestion from '@/InvalidQuestion';

import expect from 'expect';

describe(`get_valid_copy_of_question`, () => {
    it(`errors if 'type' is missing`, () => {
        expect(() => get_valid_copy_of_question({}))
            .toThrow(InvalidQuestion);
    });
    it(`errors if 'type' is not a string`, () => {
        expect(() => get_valid_copy_of_question({type: 4}))
            .toThrow(InvalidQuestion);
    });
    it('errors if type is unknown', () => {
        expect(() => get_valid_copy_of_question({type: 'foo'}))
            .toThrow(InvalidQuestion);
    });

});

const question_schema = [{
    type: {
        type: String,
        required: true,
    },
    prompt:  {type: String, required: true, trim: true},
    choices: [String],
    answer:  {type: 'mongoose.Mixed', required: true},
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
}];

