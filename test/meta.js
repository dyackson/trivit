/* global it, describe */
import expect from 'expect';

import {
    get_answer_on_type_change,
    VALID_TYPES,
    TYPE_CONFIGS,
} from '@/meta';
import AnswerConversionError from '@/AnswerConversionError';

describe('get_answer_on_type_change', () => {
    it('covers all possible conversions', () => {
        VALID_TYPES.forEach(to_type => {
            VALID_TYPES.forEach(from_type => {
                let answer = '';
                if (TYPE_CONFIGS[from_type].get_empty_choice) {
                    answer = [TYPE_CONFIGS[from_type].get_empty_choice()];
                }
                try {
                    const converted_answer = get_answer_on_type_change({
                        from_type,
                        to_type,
                        answer,
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
    let x;
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
                {from: true, to: []}
            ]
        },
        {
            from_type: 'true_false',
            to_type: 'mc_multiple',
            instances: [
                {from: true, to: []}
            ]
        },
        {
            from_type: 'true_false',
            to_type: 'ordered',
            instances: [
                {from: true, to: []}
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
                {from: 'some words', to: [{text: 'some words', value: true}]},
                {from: '', to: []},
                {from: '   ', to: []},
            ]
        },
        {
            from_type: 'free_form',
            to_type: 'mc_multiple',
            instances: [
                {from: 'some words', to: [{text: 'some words', value: true}]},
                {from: '', to: [], warns: false},
                {from: '   ', to: [], warns: false},
            ]
        },
        {
            from_type: 'free_form',
            to_type: 'ordered',
            instances: [
                {from: 'some words', to: [{text: 'some words', value: ''}]},
                {from: '', to: []},
                {from: '   ', to: []},
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
                    to: '',
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
                    why: 'none are true',
                    from: [{text: 'a', value: false}, {text: 'b', value: false}],
                    to: [{text: 'a', value: false}, {text: 'b', value: false}],
                    warns: false,
                },
                {
                    why: 'multiple have text again',
                    from: [{text: 'a', value: false}, {text: 'b', value: true}],
                    to: [{text: 'a', value: false}, {text: 'b', value: true}],
                    warns: false,
                },
                {
                    why: 'one has text',
                    from: [{text: 'a', value: false}, {text: ' ', value: false}],
                    from: [{text: 'a', value: false}],
                    warns: false,
                },
                {
                    why: 'both texts empty',
                    from: [{text: ' ', value: false}, {text: ' ', value: true}],
                    to: [],
                    warns: false,
                },
                {
                    why: 'answer is empty',
                    from: [],
                    to: [],
                    warns: false,
                },
                {from: x, to: x}
            ]
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
                    warns: true,
                },
                {
                    why: 'multiple have text again',
                    from: [{text: 'a', value: false}, {text: 'b', value: true}],
                    to: [{text: 'a', value: ''}, {text: 'b', value: ''}],
                    warns: true,
                },
                {
                    why: 'one has text',
                    from: [{text: 'a', value: false}, {text: ' ', value: false}],
                    to: [{text: 'a', value: ''}],
                    warns: true,
                },
                {
                    why: 'both texts empty',
                    from: [{text: ' ', value: false}, {text: ' ', value: true}],
                    to: [],
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
                    to: [{text: 'a', value: false}, {text: 'b', value: false}],
                    warns: true,
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
                    to: [{text: 'a', value: false}],
                    warns: false,
                },
                {
                    why: 'one has text, the other is true',
                    from: [{text: 'a', value: false}, {text: ' ', value: true}],
                    to: [{text: 'a', value: false}],
                    warns: false,
                },
                {
                    why: 'both texts empty',
                    from: [{text: ' ', value: false}, {text: ' ', value: true}],
                    to: [],
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
                    warns: true,
                },
                {
                    why: 'only b is true',
                    from: [{text: 'a', value: false}, {text: 'b', value: true}],
                    to: [{text: 'a', value: ''}, {text: 'b', value: ''}],
                    warns: true,
                },
                {
                    why: 'one has text, the other is false',
                    from: [{text: 'a', value: false}, {text: ' ', value: false}],
                    to: [{text: 'a', value: ''}],
                    warns: true,
                },
                {
                    why: 'one has text, the other is true',
                    from: [{text: 'a', value: false}, {text: ' ', value: true}],
                    to: [{text: 'a', value: ''}],
                    warns: true,
                },
                {
                    why: 'both texts empty',
                    from: [{text: ' ', value: false}, {text: ' ', value: true}],
                    to: [],
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
                    from: [{text: 'a', value: 1}, {text: 'b', value: ''}],
                    to: 'a',
                    warns: true,
                },
                {
                    why: 'one lacks text, the other lacks value',
                    from: [{text: 'a', value: ''}, {text: ' ', value: 4}],
                    to: '',
                    warns: true,
                },
                {
                    why: 'both lack value',
                    from: [{text: 'a', value: ''}, {text: 'b', value: ''}],
                    to: '',
                    warns: true,
                },
                {
                    why: 'both lack text',
                    from: [{text: ' ', value: 1}, {text: ' ', value: 1}],
                    to: '',
                    warns: true,
                },
                {
                    why: 'both lack text and value',
                    from: [{text: ' ', value: ''}, {text: ' ', value: ''}],
                    to: '',
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
            to_type: 'mc_single',
            warns: true,
            instances: [
                {from: x, to: x}
            ]
        },
        {
            from_type: 'ordered',
            to_type: 'mc_multiple',
            warns: true,
            instances: [
                {from: x, to: x}
            ]
        },
        {
            from_type: 'ordered',
            to_type: 'true_false',
            warns: true,
            instances: [
                {from: x, to: x}
            ]
        },
    ]
});
