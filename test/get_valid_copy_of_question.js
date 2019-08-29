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

        it('returns the type if a valid type', () => {
            const type = VALID_TYPES[0];
            expect(get_valid_type(type)).toEqual(type);
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
            [`type is true_false and choices is present`,
                {type: 'true_false', choices: ['x']}],
            [`type is free_form and choices is present`,
                {type: 'free_form', choices: ['x']}],

            [`type not true_false and choices is missing`,
                {type: 'foo'}],

            [`choices are not objects`,
                {type: 'order', choices: ['x', 'y', 'x ']}],
            [`type choices.i.text is not a string for order type`,
                {type: 'order',
                    choices: [{text: {}, value: 7},
                        {text: 'y', value: 3}]}],
            [`type choices.i.text is not a string for mc_single type`,
                {type: 'mc_single',
                    choices: [{text: {}, value: true},
                        {text: 'y', value: false}]}],
            [`type choices.i.text is not a string for mc_multiple type`,
                {type: 'mc_multiple',
                    choices: [{text: {}, value: true},
                        {text: 'y', value: true}]}],

            [`type is order and a choice.i.value is not sortable`,
                {type: 'order',
                    choices: [{text: 'x', value: 'first'},
                        {text: 'y', value: 3}]}],
            [`choices is not an array`,
                {type: 'foo', choices: 4}],
            [`choices is an empty array`,
                {type: 'foo', choices: []}],
            [`choices are not objects`,
                {type: 'order', choices: ['x', 'y', 'x ']}],
            [`choices.i.text contains a whitespace item`,
                {type: 'mc_single', choices: [{text: 'foo', value:' \t'}]}],
            [`choices contains contains duplicate text`,
                {type: 'mc_single', choices: [{text: 'x', value: false},
                    {text:'x', value: false}]}],
        ];
        errors_if.forEach(([msg, input]) => {
            it(`InvalidQuestion if ${msg}`, () => {
                expect(() => get_valid_choices(input))
                    .toThrow(InvalidQuestion)
            });
        });

        it('returns undefined if type is true_false or free_form', () => {
            expect(get_valid_choices({type: 'true_false'})).toEqual(undefined);
            expect(get_valid_choices({type: 'free_form'})).toEqual(undefined);
        });
        it('returns choices with texts trimmed', () => {
            expect(get_valid_choices({
                type: 'order', choices: [{text: '\tx', value: 1},
                    {text: ' y ', value: 0}]
            })).toEqual([{text: 'x', value: 1},
                {text: 'y', value: 0}]);
        });
        it('returns the trimmed choices otherwise', () => {
            expect(get_valid_choices({type: 'mc_single', choices: [
                {text: '\t x', value: true},
                {text: 'y', value: false}
            ]}))
                .toEqual([
                    {text: 'x', value: true},
                    {text: 'y', value: false}
                ]);
        });
    });
    describe(`get_valid_answer`, () => {
        let type = 'true_false';
        const errors_if = [
            [`type is ${type} and answer not boolean`,
                {type}],
        ];

        type = 'free_form';
        errors_if.push(
            [`type is ${type} and answer is non-string`,
                {type, answer: 1}],
            [`type is ${type} and answer is blank`,
                {type, answer: ' '}],
        );

        type = 'order';
        errors_if.push(
            [`type is ${type} and answer is defined`,
                {type, answer: 1}],
        );

        type = 'mc_single';
        errors_if.push(
            [`type is ${type} and answer is defined`,
                {type, answer: 1}],
        );

        type = 'mc_multiple';
        errors_if.push(
            [`type is ${type} and answer is defined`,
                {type, answer: 1}],
        );

        errors_if.forEach(([msg, input]) => {
            it(`InvalidQuestion if ${msg}`, () => {
                expect(() => get_valid_answer(input))
                    .toThrow(InvalidQuestion)
            });
        });

        it('returns a valid answer for type true_false', () => {
            expect(get_valid_answer({
                type: 'true_false', answer: false,
            })).toEqual(false);
            expect(get_valid_answer({
                type: 'true_false', answer: true,
            })).toEqual(true);
        });
        it('returns a trimmed answer for type free_form', () => {
            expect(get_valid_answer({
                type: 'free_form', answer: ' moo ',
            })).toEqual('moo');
        });
    });

    const valid_questions = [
        // true_false
        {
            type: 'true_false',
            prompt: 'Is Paul dead',
            answer: false,
            tags: ['beatles'],
            links: ['https://en.wikipedia.org/wiki/Paul_is_dead'],
        },
        {
            type: 'true_false',
            prompt: 'Is John dead',
            answer: true,
            tags: ['beatles'],
            links: ['https://en.wikipedia.org/wiki/John_Lennon'],
        },
        // free_form
        {
            type: 'free_form',
            prompt: 'Who was the drummer',
            answer: 'Ringo Starr',
            tags: ['beatles'],
            links: ['https://en.wikipedia.org/wiki/The_Beatles'],
        },
        // mc_single
        {
            type: 'mc_single',
            prompt: 'Who was the drummer',
            choices: [
                {text: 'John', value: false},
                {text: 'Paul', value: null},
                {text: 'George'},
                {text: 'Ringo', value: true},
            ],
            tags: ['beatles'],
            links: ['https://en.wikipedia.org/wiki/The_Beatles'],
        },
        // mc_multiple
        {
            type: 'mc_multiple',
            prompt: 'Who could play drums',
            choices: [
                {text: 'John', value: false},
                {text: 'Paul', value: true},
                {text: 'George'},
                {text: 'Ringo', value: true},
            ],
            tags: ['beatles'],
            links: ['https://en.wikipedia.org/wiki/The_Beatles'],
        },
        // ordered
        {
            type: 'order',
            prompt: 'Order by year of Release',
            choices: [
                {text: 'Sgt Pepper', value: 1967},
                {text: 'Please, Please Me', value: 1963},
                {text: 'Let It Be', value: 1970},
                {text: 'Help', value: 1965},
            ],
            tags: ['beatles'],
            links: ['https://en.wikipedia.org/wiki/The_Beatles'],
        },
    ];

    valid_questions.forEach((q) => {
        it(`returns a valid ${q.type} question: ${q.prompt}`, () => {
            expect(get_valid_copy_of_question(q)).toEqual(q);
        })
    });

});
