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
            it(`InvalidQuestion if ${msg}`, () => {
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
            it(`InvalidQuestion if ${msg}`, () => {
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
            [`type is true_false and choices is present`,
                {type: 'true_false', choices: ['x']}],
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
            [`type is order and choices are not objects`,
                {type: 'order', choices: ['x', 'y', 'x ']}],
            [`type is order a choice.sort_value is not a number `,
                {type: 'order',
                    choices: [{string: 'x', sort_value: 'first'},
                        {string: 'y', sort_value: 3}]}],
            [`type is order a choice.string is not a string `,
                {type: 'order',
                    choices: [{string: {}, sort_value: 'first'},
                        {string: 'y', sort_value: 3}]}],
        ];
        errors_if.forEach(([msg, input]) => {
            it(`InvalidQuestion if ${msg}`, () => {
                expect(() => get_valid_choices(input))
                    .toThrow(InvalidQuestion)
            });
        });

        it('returns undefined if type is true_false', () => {
            expect(get_valid_choices({type: 'true_false'})).toEqual(undefined);
        });
        it('returns choices with strings trimmed if type is order', () => {
            expect(get_valid_choices({
                type: 'order', choices: [{string: '\tx', sort_value: 1},
                    {string: ' y ', sort_value: 0}]
            })).toEqual([{string: 'x', sort_value: 1},
                {string: 'y', sort_value: 0}]);
        });
        it('returns the trimmed choices otherwise', () => {
            expect(get_valid_choices({type: 'foo', choices: ['\t x', 'y']}))
                .toEqual(['x', 'y']);
        });
    });
    describe(`get_valid_answer`, () => {
        let type = 'true_false';
        const errors_if = [
            [`type is ${type} and answer not boolean`,
                {type}],
        ];

        type = 'order';
        errors_if.push(
            [`type is ${type} and answer is defined`,
                {type, answer: 1}],
        );

        type = 'single';
        errors_if.push(
            [`type is ${type} and answer not an integer`,
                {type, choices: ['x', 'y'], answer: 'x'}],
            [`type is ${type} and answer not a choice index`,
                {type, choices: ['x', 'y'], answer: 2}],
        );

        type = 'multiple';
        errors_if.push(
            [`type is ${type} and answer not an array`,
                {type, choices: ['x', 'y', 'z'], answer: 1}],
            [`type is ${type} and answer not an intger array`,
                {type, choices: ['x', 'y', 'z'], answer: [1, 'z']}],
            [`type is ${type} and answer has non-choice index`,
                {type, choices: ['x', 'y', 'z'], answer: [1, 3]}],
            [`type is ${type} and answer has duplicate indices`,
                {type, choices: ['x', 'y', 'z'], answer: [1, 2, 1]}],
        );

        errors_if.forEach(([msg, input]) => {
            it(`InvalidQuestion if ${msg}`, () => {
                expect(() => get_valid_answer(input))
                    .toThrow(InvalidQuestion)
            });
        });

        it('returns a valid answer for type single', () => {
            expect(get_valid_answer({
                type: 'single', choices: ['x', 'y'], answer: 1,
            })).toEqual(1);
        });

        it('returns a undefined for type order', () => {
            expect(get_valid_answer({
                type: 'order', choices: ['x', 'y'], answer: null,
            })).toEqual(undefined);
            expect(get_valid_answer({
                type: 'order', choices: ['x', 'y'], answer: undefined,
            })).toEqual(undefined);
        });

        it('returns a valid answer for type true_false', () => {
            expect(get_valid_answer({
                type: 'true_false', answer: false,
            })).toEqual(false);
            expect(get_valid_answer({
                type: 'true_false', answer: true,
            })).toEqual(true);
        });

        it('returns a valid answer for type multiple', () => {
            expect(get_valid_answer({
                type: 'multiple', choices: ['x', 'y', 'z'], answer: [],
            })).toEqual([]);
            expect(get_valid_answer({
                type: 'multiple', choices: ['x', 'y', 'z'], answer: [0, 2],
            })).toEqual([0, 2]);
        });
    });
    describe(`get_valid_tags`, () => {
        const errors_if = [
            [`tags is not an array`, 2],
            [`tags has non-string item`, ['foo', 2]],
            [`tags has whitespace item`, ['foo', '\t']],
            [`tags has duplicate items`, ['foo', 'bar', 'foo']],
        ];

        errors_if.forEach(([msg, tags]) => {
            it(`InvalidQuestion if ${msg}`, () => {
                expect(() => get_valid_tags(tags))
                    .toThrow(InvalidQuestion)
            });
        });

        it('returns an empty array if passed an empty array', () => {
            expect(get_valid_tags([])).toEqual([]);
        });

        it('returns an a valid array with each item trimmed', () => {
            expect(get_valid_tags(['foo ', '\tbar'])).toEqual(['foo', 'bar']);
        });
    });
    describe(`get_valid_links`, () => {
        const errors_if = [
            [`links is not an array`, 2],
            [`links has non-string item`, [2]],
            [`links has non-https-urlish item`,
                ['https://www.wikipedia.org/', 'http://www.wikipedia.org/'],
            ],
            [`links has duplicate items`,
                ['https://www.wikipedia.org/', 'https://www.wikipedia.org/'],
            ]
        ];

        errors_if.forEach(([msg, links]) => {
            it(`InvalidQuestion if ${msg}`, () => {
                expect(() => get_valid_links(links))
                    .toThrow(InvalidQuestion)
            });
        });

        it('returns an empty array if passed an empty array', () => {
            expect(get_valid_links([])).toEqual([]);
        });

        it('returns an array of trimmed valid links if passed one', () => {
            const links = [
                'https://www.wikipedia.org/  ',
                'https://www.google.com',
            ];
            expect(get_valid_links(links)).toEqual(links);
        });
    });

});

/*
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
*/
