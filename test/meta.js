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
            warns: true,
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
            warns: true,
            instances: [
                {
                    why: 'none are true, absence of text doesnt matter',
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
                    why: 'one is true, absence of text doesnt matter',
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
            warns: true,
            instances: [
                {
                    why: 'none are true',
                    from: [{text: 'a', value: false}, {text: 'b', value: false}],
                    to: [{text: 'a', value: ''}, {text: 'b', value: ''}],
                    warns: false,
                },
                {
                    why: 'multiple have text again',
                    from: [{text: 'a', value: false}, {text: 'b', value: true}],
                    to: [{text: 'a', value: ''}, {text: 'b', value: ''}],
                    warns: false,
                },
                {
                    why: 'one has text',
                    from: [{text: 'a', value: false}, {text: ' ', value: false}],
                    to: [{text: 'a', value: ''}, {text: ' ', value: ''}],
                    warns: false,
                },
                {
                    why: 'both texts empty',
                    from: [{text: ' ', value: false}, {text: ' ', value: true}],
                    to: [{text: ' ', value: ''}, {text: ' ', value: ''}],
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
                    why: 'a and b are both true',
                    from: [{text: 'a', value: true}, {text: 'b', value: true}],
                    to: [{text: 'a', value: true}, {text: 'b', value: false}],
                    warns: false,
                },
                {
                    why: 'only b is true',
                    from: [{text: 'a', value: false}, {text: 'b', value: true}],
                    to: [{text: 'a', value: false}, {text: 'b', value: true}],
                    warns: false,
                },
                {
                    why: 'one has text, the other is false',
                    from: [{text: 'a', value: false}, {text: ' ', value: false}],
                    to: [{text: 'a', value: false}, {text: ' ', value: false}],
                    warns: false,
                },
                {
                    why: 'one has text, the other is true',
                    from: [{text: 'a', value: false}, {text: ' ', value: true}],
                    to: [{text: 'a', value: false}, {text: ' ', value: true}],
                    warns: false,
                },
                {
                    why: 'both texts empty',
                    from: [{text: ' ', value: false}, {text: ' ', value: true}],
                    to: [{text: ' ', value: false}, {text: ' ', value: true}],
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
            from_type: 'mc_multiple',
            to_type: 'true_false',
            instances: [
                {
                    why: 'a and b are both true',
                    from: [{text: 'a', value: true}, {text: 'b', value: true}],
                    to: false,
                    warns: true,
                },
                {
                    why: 'only b is true',
                    from: [{text: 'a', value: false}, {text: 'b', value: true}],
                    to: false,
                    warns: true,
                },
                {
                    why: 'one has text, the other is false',
                    from: [{text: 'a', value: false}, {text: ' ', value: false}],
                    to: false,
                    warns: true,
                },
                {
                    why: 'one has text, the other is true',
                    from: [{text: 'a', value: false}, {text: ' ', value: true}],
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
            from_type: 'mc_multiple',
            to_type: 'ordered',
            instances: [
                {
                    why: 'a and b are both true',
                    from: [{text: 'a', value: true}, {text: 'b', value: true}],
                    to: [{text: 'a', value: ''}, {text: 'b', value: ''}],
                    warns: false,
                },
                {
                    why: 'only b is true',
                    from: [{text: 'a', value: false}, {text: 'b', value: true}],
                    to: [{text: 'a', value: ''}, {text: 'b', value: ''}],
                    warns: false,
                },
                {
                    why: 'one has text, the other is false',
                    from: [{text: 'a', value: false}, {text: ' ', value: false}],
                    to: [{text: 'a', value: ''}, {text: ' ', value: ''}],
                    warns: false,
                },
                {
                    why: 'one has text, the other is true',
                    from: [{text: 'a', value: false}, {text: ' ', value: true}],
                    to: [{text: 'a', value: ''}, {text: ' ', value: ''}],
                    warns: false,
                },
                {
                    why: 'both texts empty',
                    from: [{text: ' ', value: false}, {text: ' ', value: true}],
                    to: [{text: ' ', value: ''}, {text: ' ', value: ''}],
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
            from_type: 'ordered',
            to_type: 'free_form',
            warns: true,
            instances: [
                {
                    why: 'two complete answers',
                    from: [{text: 'a', value: 2}, {text: 'b', value: 1}],
                    to: 'b, a',
                    warns: true,
                },
                {
                    why: 'one answer lacks value',
                    from: [{text: 'a', value: 1}, {text: 'b', value: undefined}],
                    to: 'a, b',
                    warns: true,
                },
                {
                    why: 'one lacks text, the other lacks value',
                    from: [{text: 'a', value: undefined}, {text: ' ', value: 4}],
                    to: 'a',
                    warns: true,
                },
                {
                    why: 'both lack value',
                    from: [{text: 'a', value: undefined}, {text: 'b', value: undefined}],
                    to: 'a, b',
                    warns: true,
                },
                {
                    why: 'both lack text',
                    from: [{text: ' ', value: 1}, {text: ' ', value: 1}],
                    to: '',
                    warns: false,
                },
                {
                    why: 'both lack text and value',
                    from: [{text: ' ', value: undefined}, {text: ' ', value: undefined}],
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
            from_type: 'ordered',
            to_type: 'mc_single',
            warns: true,
            instances: [
                {
                    why: 'two complete answers',
                    from: [{text: 'a', value: 2}, {text: 'b', value: 1}],
                    to: [{text: 'a', value: false}, {text: 'b', value: false}],
                    warns: true,
                },
                {
                    why: 'one complete answer',
                    from: [{text: 'a', value: 1}, {text: 'b', value: undefined}],
                    to: [{text: 'a', value: false}, {text: 'b', value: false}],
                    warns: true,
                },
                {
                    why: 'one lacks text, the other lacks value',
                    from: [{text: 'a', value: undefined}, {text: ' ', value: 4}],
                    to: [{text: 'a', value: false}, {text: ' ', value: false}],
                    warns: false,
                },
                {
                    why: 'both lack value',
                    from: [{text: 'a', value: undefined}, {text: 'b', value: undefined}],
                    to: [{text: 'a', value: false}, {text: 'b', value: false}],
                    warns: false,
                },
                {
                    why: 'both lack text',
                    from: [{text: ' ', value: 1}, {text: ' ', value: 1}],
                    to: [{text: ' ', value: false}, {text: ' ', value: false}],
                    warns: false,
                },
                {
                    why: 'both lack text and value',
                    from: [{text: ' ', value: undefined}, {text: ' ', value: undefined}],
                    to: [{text: ' ', value: false}, {text: ' ', value: false}],
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
            from_type: 'ordered',
            to_type: 'mc_multiple',
            warns: true,
            instances: [
                {
                    why: 'two complete answers',
                    from: [{text: 'a', value: 2}, {text: 'b', value: 1}],
                    to: [{text: 'a', value: false}, {text: 'b', value: false}],
                    warns: true,
                },
                {
                    why: 'one complete answer',
                    from: [{text: 'a', value: 1}, {text: 'b', value: undefined}],
                    to: [{text: 'a', value: false}, {text: 'b', value: false}],
                    warns: true,
                },
                {
                    why: 'one lacks text, the other lacks value',
                    from: [{text: 'a', value: undefined}, {text: ' ', value: 4}],
                    to: [{text: 'a', value: false}, {text: ' ', value: false}],
                    warns: false,
                },
                {
                    why: 'both lack value',
                    from: [{text: 'a', value: undefined}, {text: 'b', value: undefined}],
                    to: [{text: 'a', value: false}, {text: 'b', value: false}],
                    warns: false,
                },
                {
                    why: 'both lack text',
                    from: [{text: ' ', value: 1}, {text: ' ', value: 1}],
                    to: [{text: ' ', value: false}, {text: ' ', value: false}],
                    warns: false,
                },
                {
                    why: 'both lack text and value',
                    from: [{text: ' ', value: undefined}, {text: ' ', value: undefined}],
                    to: [{text: ' ', value: false}, {text: ' ', value: false}],
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
            from_type: 'ordered',
            to_type: 'true_false',
            warns: true,
            instances: [
                {
                    why: 'two complete answers',
                    from: [{text: 'a', value: 2}, {text: 'b', value: 1}],
                    to: false,
                    warns: true,
                },
                {
                    why: 'one answer lacks value',
                    from: [{text: 'a', value: 1}, {text: 'b', value: undefined}],
                    to: false,
                    warns: true,
                },
                {
                    why: 'one lacks text, the other lacks value',
                    from: [{text: 'a', value: undefined}, {text: ' ', value: 4}],
                    to: false,
                    warns: true,
                },
                {
                    why: 'both lack value',
                    from: [{text: 'a', value: undefined}, {text: 'b', value: undefined}],
                    to: false,
                    warns: true,
                },
                {
                    why: 'both lack text',
                    from: [{text: ' ', value: 1}, {text: ' ', value: 1}],
                    to: false,
                    warns: false,
                },
                {
                    why: 'both lack text and value',
                    from: [{text: ' ', value: undefined}, {text: ' ', value: undefined}],
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
