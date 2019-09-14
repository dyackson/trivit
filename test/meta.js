/* global it, describe */
import expect from 'expect';

import {
    get_answer_on_type_change,
    VALID_TYPES,
    TYPE_CONFIGS,
} from '@/meta';
import AnswerConversionError from '@/AnswerConversionError';

function new_key_holder() {
    return {key: 0};
}
// we'll need these for the convsion tests
const empty_ans_by_type = {
    mc_single: TYPE_CONFIGS.mc_single.get_empty_ans(new_key_holder()),
    mc_multiple: TYPE_CONFIGS.mc_multiple.get_empty_ans(new_key_holder()),
    ordered: TYPE_CONFIGS.ordered.get_empty_ans(new_key_holder()),
};

describe('get_answer_on_type_change', () => {
    it('covers all possible conversions', () => {
        VALID_TYPES.forEach(to_type => {
            VALID_TYPES.forEach(from_type => {
                let answer = '';
                if (TYPE_CONFIGS[from_type].get_empty_ans) {
                    console.log('fuck');
                    answer = [TYPE_CONFIGS[from_type]
                        .get_empty_ans(new_key_holder())];
                }
                try {
                    const converted_answer = get_answer_on_type_change({
                        from_type,
                        to_type,
                        answer,
                        key_holder: new_key_holder(),
                    });
                    expect(converted_answer).toBeDefined();
                } catch (e) {
                    try {
                        expect(e).toBeInstanceOf(AnswerConversionError);
                    } catch (_) {
                        throw e;
                    }
                    expect(e.converted_answer).toBeDefined();
                }
            });
        });
    })
    const conversions = [
        // from true_false
        {
            from_type: 'true_false',
            to_type: 'free_form',
            instances: [
                {from: true, to: ''}
            ]
        },
        {
            from_type: 'true_false',
            to_type: 'mc_single',
            instances: [
                {from: true, to: [empty_ans_by_type.mc_single]}
            ]
        },
        {
            from_type: 'true_false',
            to_type: 'mc_multiple',
            instances: [
                {from: true, to: [empty_ans_by_type.mc_multiple]}
            ]
        },
        {
            from_type: 'true_false',
            to_type: 'ordered',
            instances: [
                {from: true, to: [empty_ans_by_type.ordered]}
            ]
        },
        // from free_form
        {
            from_type: 'free_form',
            to_type: 'true_false',
            instances: [
                {from: 'some words', to: false, warns: true},
                {from: '', to: false},
                {from: '   ', to: false},
            ]
        },
        {
            from_type: 'free_form',
            to_type: 'mc_single',
            instances: [
                {from: 'some words',
                    to: [{text: 'some words', value: true, key: 0}]},
                {from: '', to: [empty_ans_by_type.mc_single]},
                {from: '   ', to: [empty_ans_by_type.mc_single]},
            ]
        },
        {
            from_type: 'free_form',
            to_type: 'mc_multiple',
            instances: [
                {from: 'some words',
                    to: [{text: 'some words', value: true, key: 0}]},
                {from: '', to: [empty_ans_by_type.mc_multiple]},
                {from: '   ', to: [empty_ans_by_type.mc_multiple]},
            ]
        },
        {
            from_type: 'free_form',
            to_type: 'ordered',
            instances: [
                {from: 'some words',
                    to: [{text: 'some words', value: '', key: 0}]},
                {from: '', to: [empty_ans_by_type.ordered]},
                {from: '   ', to: [empty_ans_by_type.ordered]},
            ]
        },
        // from mc_single
        {
            from_type: 'mc_single',
            to_type: 'free_form',
            instances: [
                {
                    why: 'neither is true',
                    from: [{text: 'a', value: false}, {text: 'b', value: false}],
                    to: '',
                    warns: true,
                },
                {
                    why: 'only b is true',
                    from: [{text: 'a', value: false}, {text: 'b', value: true}],
                    to: 'b',
                    warns: true,
                },
                {
                    why: 'neither is true and has text',
                    from: [{text: 'a', value: false}, {text: ' ', value: true}],
                    to: '',
                    warns: true,
                },
                {
                    why: 'both texts empty',
                    from: [{text: ' ', value: false}, {text: ' ', value: true}],
                    to: '',
                    warns: false,
                },
                {
                    why: 'answer is empty',
                    from: [],
                    to: '',
                    warns: false,
                },
            ]
        },
        {
            from_type: 'mc_single',
            to_type: 'true_false',
            instances: [
                {
                    why: 'neither is true',
                    from: [{text: 'a', value: true}, {text: 'b', value: true}],
                    to: false,
                    warns: true,
                },
                {
                    why: 'one is true',
                    from: [{text: 'a', value: false}, {text: 'b', value: true}],
                    to: false,
                    warns: true,
                },
                {
                    why: 'one has text',
                    from: [{text: 'a', value: false}, {text: ' ', value: false}],
                    to: false,
                    warns: true,
                },
                {
                    why: 'both texts empty',
                    from: [{text: ' ', value: false}, {text: ' ', value: true}],
                    to: false,
                    warns: false,
                },
                {
                    why: 'answer is empty',
                    from: [],
                    to: false,
                    warns: false,
                },
            ]
        },
        {
            from_type: 'mc_single',
            to_type: 'mc_multiple',
            instances: [
                {
                    why: 'converts regardless of text absence',
                    from: [
                        {text: 'a', value: false, key: 0},
                        {text: 'b', value: false, key: 1},
                        {text: '', value: true, key: 2},
                        {text: '  ', value: false, key: 3},
                    ],
                    to: [
                        {text: 'a', value: false, key: 0},
                        {text: 'b', value: false, key:1},
                        {text: '', value: true, key: 2},
                        {text: '  ', value: false, key: 3},
                    ],
                },
                {
                    why: 'answer is empty',
                    from: [],
                    to: [],
                },
            ],
        },
        {
            from_type: 'mc_single',
            to_type: 'ordered',
            instances: [
                {
                    why: 'converted regardless of text',
                    from: [
                        {text: 'a', value: false, key: 0},
                        {text: 'b', value: true, key: 1},
                        {text: '', value: false, key: 2},
                        {text: ' ', value: false, key: 3},
                    ],
                    to: [
                        {text: 'a', value: '', key: 0},
                        {text: 'b', value: '', key: 1},
                        {text: '', value: '', key: 2},
                        {text: ' ', value: '', key: 3},
                    ],
                    warns: false,
                },
                {
                    why: 'answer is empty',
                    from: [],
                    to: [],
                    warns: false,
                },
            ]
        },
        // from mc_multiple
        {
            from_type: 'mc_multiple',
            to_type: 'free_form',
            instances: [
                {
                    why: 'a and b are both true',
                    from: [{text: 'a', value: true}, {text: 'b', value: true}],
                    to: 'a, b',
                    warns: true,
                },
                {
                    why: 'only b is true',
                    from: [{text: 'a', value: false}, {text: 'b', value: true}],
                    to: 'b',
                    warns: true,
                },
                {
                    why: 'one has text, the other is false',
                    from: [{text: 'a', value: false}, {text: ' ', value: false}],
                    to: '',
                    warns: true,
                },
                {
                    why: 'one has text, the other is true',
                    from: [{text: 'a', value: false}, {text: ' ', value: true}],
                    to: '',
                    warns: true,
                },
                {
                    why: 'both texts empty',
                    from: [{text: ' ', value: false}, {text: ' ', value: true}],
                    to: '',
                    warns: false,
                },
                {
                    why: 'answer is empty',
                    from: [],
                    to: '',
                    warns: false,
                },
            ]
        },
        {
            from_type: 'mc_multiple',
            to_type: 'mc_single',
            instances: [
                {
                    why: 'converts regardless of text absence',
                    from: [
                        {text: 'a', value: false, key: 0},
                        {text: 'b', value: false, key: 1},
                        {text: '', value: true, key: 2},
                        {text: '  ', value: false, key: 3},
                    ],
                    to: [
                        {text: 'a', value: false, key: 0},
                        {text: 'b', value: false, key:1},
                        {text: '', value: true, key: 2},
                        {text: '  ', value: false, key: 3},
                    ],
                },
                {
                    why: 'only keeps the first true marked true',
                    from: [
                        {text: 'a', value: true, key: 0},
                        {text: 'b', value: true, key: 1},
                        {text: '', value: true, key: 2},
                        {text: '  ', value: false, key: 3},
                    ],
                    to: [
                        {text: 'a', value: true, key: 0},
                        {text: 'b', value: false, key:1},
                        {text: '', value: false, key: 2},
                        {text: '  ', value: false, key: 3},
                    ],
                },
                {
                    why: 'if none are true, none are true',
                    from: [
                        {text: 'a', value: false, key: 0},
                        {text: 'b', value: false, key: 1},
                        {text: '', value: false, key: 2},
                        {text: '  ', value: false, key: 3},
                    ],
                    to: [
                        {text: 'a', value: false, key: 0},
                        {text: 'b', value: false, key:1},
                        {text: '', value: false, key: 2},
                        {text: '  ', value: false, key: 3},
                    ],
                },
                {
                    why: 'answer is empty',
                    from: [],
                    to: [],
                },
            ]
        },
        {
            from_type: 'mc_multiple',
            to_type: 'true_false',
            instances: [
                {
                    why: 'one has text',
                    from: [{text: 'a', value: false}, {text: ' ', value: true}],
                    to: false,
                    warns: true,
                },
                {
                    why: 'none have text',
                    from: [{text: ' ', value: false}, {text: ' ', value: true}],
                    to: false,
                    warns: false,
                },
                {
                    why: 'answer is empty',
                    from: [],
                    to: false,
                    warns: false,
                },
            ]
        },
        {
            from_type: 'mc_multiple',
            to_type: 'ordered',
            instances: [
                {
                    why: 'converted regardless of text',
                    from: [
                        {text: 'a', value: false, key: 0},
                        {text: 'b', value: true, key: 1},
                        {text: '', value: false, key: 2},
                        {text: ' ', value: true, key: 3},
                    ],
                    to: [
                        {text: 'a', value: '', key: 0},
                        {text: 'b', value: '', key: 1},
                        {text: '', value: '', key: 2},
                        {text: ' ', value: '', key: 3},
                    ],
                    warns: false,
                },
                {
                    why: 'answer is empty',
                    from: [],
                    to: [],
                    warns: false,
                },
            ]
        },
        // from ordered
        {
            to_type: 'free_form',
            from_type: 'ordered',
            instances: [
                {
                    why: 'an answer has text',
                    from: [{text: 'a', value: undefined}, {text: '', value: undefined}],
                    to: 'a',
                    warns: true,
                },
                {
                    why: 'an answer has value',
                    from: [{text: '', value: 1}, {text: '', value: undefined}],
                    to: '',
                    warns: true,
                },
                {
                    why: 'no answer has text or value',
                    from: [{text: '', value: undefined}, {text: ' ', value: undefined}],
                    to: '',
                    warns: false,
                },
                {
                    why: 'text-having answer get ordered with no val items last',
                    from: [
                        {text: '', value: 7},
                        {text: 'a', value: 2},
                        {text: 'd', value: undefined},
                        {text: 'b', value: 1},
                        {text: 'c', value: 3},
                    ],
                    to: 'b (1), a (2), c (3), d',
                    warns: true,
                },
                {
                    why: 'answer is empty',
                    from: [],
                    to: '',
                    warns: false,
                },
            ]
        },
        {
            to_type: 'mc_single',
            from_type: 'ordered',
            instances: [
                {
                    why: 'some answer has text and value',
                    from: [
                        {text: 'a', value: 2, key: 0},
                        {text: '', value: 4, key: 1},
                        {text: 'b', value: undefined, key: 2},
                    ],
                    to: [
                        {text: 'a', value: false, key: 0},
                        {text: '', value: false, key: 1},
                        {text: 'b', value: false, key: 2},
                    ],
                    warns: true,
                },
                {
                    why: 'no answer has text or value',
                    from: [
                        {text: ' ', value: undefined, key: 0},
                        {text: '', value: undefined, key: 1},
                    ],
                    to: [
                        {text: ' ', value: false, key: 0},
                        {text: '', value: false, key: 1},
                    ],
                    warns: false,
                },
                {
                    why: 'answer is empty',
                    from: [],
                    to: [],
                    warns: false,
                },
            ]
        },
        {
            to_type: 'mc_multiple',
            // same as to mc_single
            from_type: 'ordered',
            instances: [
                {
                    why: 'some answer has text and value',
                    from: [
                        {text: 'a', value: 2, key: 0},
                        {text: '', value: 4, key: 1},
                        {text: 'b', value: undefined, key: 2},
                    ],
                    to: [
                        {text: 'a', value: false, key: 0},
                        {text: '', value: false, key: 1},
                        {text: 'b', value: false, key: 2},
                    ],
                    warns: true,
                },
                {
                    why: 'no answer has text or value',
                    from: [
                        {text: ' ', value: undefined, key: 0},
                        {text: '', value: undefined, key: 1},
                    ],
                    to: [
                        {text: ' ', value: false, key: 0},
                        {text: '', value: false, key: 1},
                    ],
                    warns: false,
                },
                {
                    why: 'answer is empty',
                    from: [],
                    to: [],
                    warns: false,
                },
            ]
        },
        {
            to_type: 'true_false',
            from_type: 'ordered',
            instances: [
                {
                    why: 'some answer has text',
                    from: [{text: 'a', value: undefined}, {text: '', value: undefined}],
                    to: false,
                    warns: true,
                },
                {
                    why: 'some answer has value',
                    from: [{text: ' ', value: 0}, {text: '', value: undefined}],
                    to: false,
                    warns: true,
                },
                {
                    why: 'no answer has text or value',
                    from: [{text: '', value: undefined}, {text: ' ', value: undefined}],
                    to: false,
                    warns: false,
                },
                {
                    why: 'answer is empty',
                    from: [],
                    to: false,
                    warns: false,
                },
            ]
        },
    ]

    conversions.forEach(({from_type, to_type, instances}) => {
        describe(`${to_type} from ${from_type}`, () => {
            instances.forEach(({why, from, to, warns}, i) => {
                it(`${why || i}`, () => {
                    try {
                        expect(get_answer_on_type_change({
                            from_type,
                            to_type,
                            answer: from,
                            key_holder: new_key_holder(),
                        })).toEqual(to);
                        expect(false).toEqual(Boolean(warns));

                    } catch (e) {
                        if (!(e instanceof AnswerConversionError)) {
                            throw e;
                        }
                        expect(e.converted_answer).toEqual(to);
                        expect(true).toEqual(warns);
                    }
                });
            });
        });
    });
});
