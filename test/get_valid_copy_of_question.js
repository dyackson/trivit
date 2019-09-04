/* global it, describe */
import get_valid_copy_of_question, {
    get_valid_type,
    get_valid_prompt,
    get_valid_choices,
    get_valid_tags,
    get_valid_links,
} from '@/get_valid_copy_of_question';
import {VALID_TYPES} from '@/meta';
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
        const results_by_type = {
            true_false: {
                errors_if: [
                    {
                        why: `choices is not boolean`,
                        given_choices: ['x'],
                    },
                ],
                good_if: [
                    {
                        why: `choices is a boolean`,
                        given_choices: false,
                    },
                ],
            },
            free_form: {
                errors_if: [
                    {
                        why: `choice is not a string`,
                        given_choices: [],
                    },
                    {
                        why: `choice is a blank string`,
                        given_choices: '  ',
                    },
                ],
                good_if: [
                    {
                        why: `choice is a lengthy string (trims result)`,
                        given_choices: ' foo ',
                        returns_choices: 'foo',
                    },
                ],
            },
            mc_single: {
                errors_if: [
                    {
                        why: `choices is empty`,
                        given_choices: '',
                    },
                    {
                        why: `choices is empty array`,
                        given_choices: [],
                    },
                    {
                        why: `choices not an array`,
                        given_choices: 88,
                    },
                    {
                        why: `choices not an objects`,
                        given_choices: ['foo', 'bar'],
                    },
                    {
                        why: `choices contain duplicate text`,
                        given_choices: [
                            {text: 'a', value: true},
                            {text: ' a ', value: false},
                        ],
                    },
                    {
                        why: `multiple correct answers`,
                        given_choices: [
                            {text: 'a', value: true},
                            {text: 'b', value: true},
                        ],
                    },
                    {
                        why: `no correct answer`,
                        given_choices: [
                            {text: 'a', value: false},
                            {text: 'b', value: false},
                        ],
                    },
                    {
                        why: `a choice.text is not a string`,
                        given_choices: [
                            {text: {}, value: true},
                            {text: ' b ', value: false},
                        ],
                    },
                    {
                        why: `a choice.text is a blank string`,
                        given_choices: [
                            {text: '  ', value: true},
                            {text: ' b ', value: false},
                        ],
                    }
                ],
                good_if: [
                    {
                        why: `only one correct and unique trimmed texts lengthy`,
                        given_choices: [
                            {text: ' a ', value: false},
                            {text: ' b', value: true},
                        ],
                        returns_choices: [
                            {text: 'a', value: false},
                            {text: 'b', value: true},
                        ],
                    },
                ],
            },
            mc_multiple: {
                errors_if: [
                    {
                        why: `choices is empty`,
                        given_choices: '',
                    },
                    {
                        why: `choices is empty array`,
                        given_choices: [],
                    },
                    {
                        why: `choices not an array`,
                        given_choices: 88,
                    },
                    {
                        why: `choices not an objects`,
                        given_choices: ['foo', 'bar'],
                    },
                    {
                        why: `choices contain duplicate text`,
                        given_choices: [
                            {text: 'a', value: true},
                            {text: ' a ', value: false},
                        ],
                    },
                    {
                        why: `a choice.text is not a string`,
                        given_choices: [
                            {text: {}, value: true},
                            {text: ' b ', value: false},
                        ],
                    },
                    {
                        why: `a choice.text is a blank string`,
                        given_choices: [
                            {text: '  ', value: true},
                            {text: ' b ', value: false},
                        ],
                    }
                ],
                good_if: [
                    {
                        why: `only one correct and unique trimmed texts lengthy`,
                        given_choices: [
                            {text: ' a ', value: false},
                            {text: ' b', value: true},
                        ],
                        returns_choices: [
                            {text: 'a', value: false},
                            {text: 'b', value: true},
                        ],
                    },
                    {
                        why: `multiple correct and unique trimmed texts lengthy`,
                        given_choices: [
                            {text: ' a ', value: true},
                            {text: ' b', value: true},
                        ],
                        returns_choices: [
                            {text: 'a', value: true},
                            {text: 'b', value: true},
                        ],
                    },
                    {
                        why: `zero correct and unique trimmed texts lengthy`,
                        given_choices: [
                            {text: ' a ', value: true},
                            {text: ' b', value: true},
                        ],
                        returns_choices: [
                            {text: 'a', value: true},
                            {text: 'b', value: true},
                        ],
                    },
                ],
            },
            ordered: {
                errors_if: [
                    {
                        why: `choices is empty`,
                        given_choices: '',
                    },
                    {
                        why: `choices is empty array`,
                        given_choices: [],
                    },
                    {
                        why: `choices not an array`,
                        given_choices: 88,
                    },
                    {
                        why: `choices not an objects`,
                        given_choices: ['foo', 'bar'],
                    },
                    {
                        why: `choices contain duplicate text`,
                        given_choices: [
                            {text: 'a', value: 1},
                            {text: ' a ', value: 2},
                        ],
                    },
                    {
                        why: `a choice.value is not a number`,
                        given_choices: [
                            {text: 'a', value: 'zoo'},
                            {text: ' b ', value: 2},
                        ],
                    },
                    {
                        why: `a choice.text is not a string`,
                        given_choices: [
                            {text: {}, value: 8},
                            {text: ' b ', value: 2},
                        ],
                    },
                    {
                        why: `a choice.text is a blank string`,
                        given_choices: [
                            {text: '  ', value: 8},
                            {text: ' b ', value: 2},
                        ],
                    }
                ],
                good_if: [
                    {
                        why: `unique trimmed texts and number values`,
                        given_choices: [
                            {text: 'a', value: 8},
                            {text: ' b ', value: 2},
                        ],
                        returns_choices: [
                            {text: 'a', value: 8},
                            {text: 'b', value: 2},
                        ],
                    },
                    {
                        why: `unique trimmed texts with duplicate number values`,
                        given_choices: [
                            {text: 'a', value: 8},
                            {text: ' b ', value: 8},
                        ],
                        returns_choices: [
                            {text: 'a', value: 8},
                            {text: 'b', value: 8},
                        ],
                    },
                ],
            },
        }

        Object.entries(results_by_type)
            .forEach(([type, {errors_if, good_if}]) => {
                describe(type, () => {
                    errors_if.forEach(({why, given_choices}) =>
                        it(`errors if ${why}`, () =>
                            expect(() => get_valid_choices({
                                type,
                                choices: given_choices,
                            })).toThrow(InvalidQuestion)));

                    good_if.forEach(({why, given_choices, returns_choices}) =>
                        it(`good: ${why}`, () =>
                            expect(get_valid_choices({
                                type,
                                choices: given_choices,
                            })).toEqual(returns_choices || given_choices)));
                });
            });
    });

    const valid_questions = [
        // true_false
        {
            type: 'true_false',
            prompt: 'Is Paul dead',
            choices: false,
            tags: ['beatles'],
            links: ['https://en.wikipedia.org/wiki/Paul_is_dead'],
        },
        {
            type: 'true_false',
            prompt: 'Is John dead',
            choices: true,
            tags: ['beatles'],
            links: ['https://en.wikipedia.org/wiki/John_Lennon'],
        },
        // free_form
        {
            type: 'free_form',
            prompt: 'Who was the drummer',
            choices: 'Ringo Starr',
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
            type: 'ordered',
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
