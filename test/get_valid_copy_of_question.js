/* global it, describe */
import get_valid_copy_of_question, {
    get_valid_type,
    get_valid_prompt,
    get_valid_choices,
    get_valid_answer,
    get_valid_tags,
    get_valid_links,
    VALID_TYPES,
} from '@/get_valid_copy_of_question';
import InvalidQuestion from '@/InvalidQuestion';

import expect from 'expect';

describe(`get_valid_copy_of_question`, () => {
    describe(`get_valid_type`, () => {
        const errors_if = [
            [`type is missing`, undefined],
            [`type is not a string`, 4],
            [`type is unknown`, 'foo'],
        ];
        errors_if.forEach(([msg, type]) => {
            it(msg, () => {
                expect(() => get_valid_type(type))
                    .toThrow(InvalidQuestion)
            });
        });

        it('returns the type if in valid types', () => {
            const type = VALID_TYPES[0];
            expect(get_valid_type(type)).toEqual(type);
        });
    });
    describe(`get_valid_prompt`, () => {
        const errors_if = [
            [`prompt is missing`, undefined],
            [`prompt is not a string`, 4],
            [`prompt is whitespace`, ' \t'],
        ];
        errors_if.forEach(([msg, prompt]) => {
            it(msg, () => {
                expect(() => get_valid_prompt(prompt))
                    .toThrow(InvalidQuestion)
            });
        });

        it('returns the trimmed prompt if valid', () => {
            expect(get_valid_prompt(' why ')).toEqual('why');
        });

    });
    describe(`get_valid_choices`, () => {
        const errors_if = [
            [`type not true_false and choices is missing`,
                {type: 'foo'}],
            [`choices is not an array`,
                {type: 'foo', choices: 4}],
            [`choices is an empty array`,
                {type: 'foo', choices: []}],
            [`choices contains a non-string item`,
                {type: 'foo', choices: ['x', 2]}],
            [`choices contains a whitespace item`,
                {type: 'foo', choices: ['x', ' \t']}],
            [`choices contains contains duplicates`,
                {type: 'foo', choices: ['x', 'y', 'x ']}],
        ];
        errors_if.forEach(([msg, input]) => {
            it(msg, () => {
                expect(() => get_valid_choices(input))
                    .toThrow(InvalidQuestion)
            });
        });

        it('returns undefined if type is true_false', () => {
            expect(get_valid_choices({type: 'true_false'})).toEqual(undefined);
        });
        it('returns the trimmed choices otherwise', () => {
            expect(get_valid_choices({type: 'foo', choices: ['\t x', 'y']}))
                .toEqual(['x', 'y']);
        });
    });
    describe(`get_valid_answer`, () => {
    });
    describe(`get_valid_tags`, () => {
    });
    describe(`get_valid_links`, () => {
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

