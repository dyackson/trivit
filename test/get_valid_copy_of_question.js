/* global it, describe */
import get_valid_copy_of_question, {
    get_valid_type,
    get_valid_prompt,
    get_valid_answer,
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

    describe(`get_valid_answer`, () => {
        const results_by_type = {
            true_false: {
                errors_if: [
                    {
                        why: `answer is not boolean`,
                        given_answer: ['x'],
                    },
                ],
                good_if: [
                    {
                        why: `answers is a boolean`,
                        given_answer: false,
                    },
                ],
            },
            free_form: {
                errors_if: [
                    {
                        why: `answer is not a string`,
                        given_answer: [],
                    },
                    {
                        why: `answer is a blank string`,
                        given_answer: '  ',
                    },
                ],
                good_if: [
                    {
                        why: `answer is a lengthy string (trims result)`,
                        given_answer: ' foo ',
                        returns_answer: 'foo',
                    },
                ],
            },
            mc_single: {
                errors_if: [
                    {
                        why: `answer is empty`,
                        given_answer: '',
                    },
                    {
                        why: `answer is empty array`,
                        given_answer: [],
                    },
                    {
                        why: `answer not an array`,
                        given_answer: 88,
                    },
                    {
                        why: `answer not an objects`,
                        given_answer: ['foo', 'bar'],
                    },
                    {
                        why: `answer contain duplicate text`,
                        given_answer: [
                            {text: 'a', value: true},
                            {text: ' a ', value: false},
                        ],
                    },
                    {
                        why: `multiple correct answers`,
                        given_answer: [
                            {text: 'a', value: true},
                            {text: 'b', value: true},
                        ],
                    },
                    {
                        why: `no correct answer`,
                        given_answer: [
                            {text: 'a', value: false},
                            {text: 'b', value: false},
                        ],
                    },
                    {
                        why: `a choice.text is not a string`,
                        given_answer: [
                            {text: {}, value: true},
                            {text: ' b ', value: false},
                        ],
                    },
                    {
                        why: `a choice.text is a blank string`,
                        given_answer: [
                            {text: '  ', value: true},
                            {text: ' b ', value: false},
                        ],
                    }
                ],
                good_if: [
                    {
                        why: `only one correct and unique trimmed texts lengthy`,
                        given_answer: [
                            {text: ' a ', value: false},
                            {text: ' b', value: true},
                        ],
                        returns_answer: [
                            {text: 'a', value: false},
                            {text: 'b', value: true},
                        ],
                    },
                ],
            },
            mc_multiple: {
                errors_if: [
                    {
                        why: `answer is empty`,
                        given_answer: '',
                    },
                    {
                        why: `answer is empty array`,
                        given_answer: [],
                    },
                    {
                        why: `answer not an array`,
                        given_answer: 88,
                    },
                    {
                        why: `answer not an objects`,
                        given_answer: ['foo', 'bar'],
                    },
                    {
                        why: `answer contain duplicate text`,
                        given_answer: [
                            {text: 'a', value: true},
                            {text: ' a ', value: false},
                        ],
                    },
                    {
                        why: `a choice.text is not a string`,
                        given_answer: [
                            {text: {}, value: true},
                            {text: ' b ', value: false},
                        ],
                    },
                    {
                        why: `a choice.text is a blank string`,
                        given_answer: [
                            {text: '  ', value: true},
                            {text: ' b ', value: false},
                        ],
                    }
                ],
                good_if: [
                    {
                        why: `only one correct and unique trimmed texts lengthy`,
                        given_answer: [
                            {text: ' a ', value: false},
                            {text: ' b', value: true},
                        ],
                        returns_answer: [
                            {text: 'a', value: false},
                            {text: 'b', value: true},
                        ],
                    },
                    {
                        why: `multiple correct and unique trimmed texts lengthy`,
                        given_answer: [
                            {text: ' a ', value: true},
                            {text: ' b', value: true},
                        ],
                        returns_answer: [
                            {text: 'a', value: true},
                            {text: 'b', value: true},
                        ],
                    },
                    {
                        why: `zero correct and unique trimmed texts lengthy`,
                        given_answer: [
                            {text: ' a ', value: true},
                            {text: ' b', value: true},
                        ],
                        returns_answer: [
                            {text: 'a', value: true},
                            {text: 'b', value: true},
                        ],
                    },
                ],
            },
            ordered: {
                errors_if: [
                    {
                        why: `answer is empty`,
                        given_answer: '',
                    },
                    {
                        why: `answer is empty array`,
                        given_answer: [],
                    },
                    {
                        why: `answer not an array`,
                        given_answer: 88,
                    },
                    {
                        why: `answer not an objects`,
                        given_answer: ['foo', 'bar'],
                    },
                    {
                        why: `answer contain duplicate text`,
                        given_answer: [
                            {text: 'a', value: 1},
                            {text: ' a ', value: 2},
                        ],
                    },
                    {
                        why: `a choice.value is not a number`,
                        given_answer: [
                            {text: 'a', value: 'zoo'},
                            {text: ' b ', value: 2},
                        ],
                    },
                    {
                        why: `a choice.text is not a string`,
                        given_answer: [
                            {text: {}, value: 8},
                            {text: ' b ', value: 2},
                        ],
                    },
                    {
                        why: `a choice.text is a blank string`,
                        given_answer: [
                            {text: '  ', value: 8},
                            {text: ' b ', value: 2},
                        ],
                    }
                ],
                good_if: [
                    {
                        why: `unique trimmed texts and number values`,
                        given_answer: [
                            {text: 'a', value: 8},
                            {text: ' b ', value: 2},
                        ],
                        returns_answer: [
                            {text: 'a', value: 8},
                            {text: 'b', value: 2},
                        ],
                    },
                    {
                        why: `unique trimmed texts with duplicate number values`,
                        given_answer: [
                            {text: 'a', value: 8},
                            {text: ' b ', value: 8},
                        ],
                        returns_answer: [
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
                    errors_if.forEach(({why, given_answer}) =>
                        it(`errors if ${why}`, () =>
                            expect(() => get_valid_answer({
                                type,
                                answer: given_answer,
                            })).toThrow(InvalidQuestion)));

                    good_if.forEach(({why, given_answer, returns_answer}) =>
                        it(`good: ${why}`, () =>
                            expect(get_valid_answer({
                                type,
                                answer: given_answer,
                            })).toEqual(returns_answer || given_answer)));
                });
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
            answer: [
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
            answer: [
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
            answer: [
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
