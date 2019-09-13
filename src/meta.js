import Ans from '@/components/Ans';
import OrderedAns from '@/components/OrderedAns';
import AnswerConversionError from '@/AnswerConversionError';
import {sortBy} from 'lodash';

export const TYPE_CONFIGS = {
    free_form: {
        display: 'Simple',
    },
    true_false: {
        display: 'True/False',
    },
    mc_single: {
        display: 'Multiple Choice -- Single Answer',
        ans_component: Ans,
        get_empty_ans() {
            return {text: '', value: false}
        },
        on_ans_toggled(answer, key) {
            const toggled = answer.find((ans) => ans.key === key);

            if (toggled.value) {
                return make_toggled_false();
            }  else {
                return make_toggled_the_only_true();
            }

            function make_toggled_false() {
                return answer.map((ans) => {
                    if (ans.key === key) {
                        return {...ans, value: false};
                    } else {
                        return ans;
                    }
                });
            }

            function make_toggled_the_only_true() {
                return answer.map((ans) => {
                    if (ans.key === key) {
                        return {...ans, value: true};
                    } else if (ans.value) {
                        return {...ans, value: false};
                    } else {
                        // it's already false
                        return ans;
                    }
                });
            }
        },
    },
    mc_multiple: {
        display: 'Multiple Choice -- Multiple Answers',
        ans_component: Ans,
        get_empty_ans() {
            return {text: '', value: false}
        },
        on_ans_toggled(answer, key) {
            return answer.map((ans) => {
                if (ans.key === key) {
                    return {...ans, value: !ans.value};
                } else {
                    return ans;
                }
            });
        },
    },
    ordered: {
        display: 'Ordered',
        ans_component: OrderedAns,
        get_empty_ans() {
            return {text: '', value: ''}
        },
    },
};

export const VALID_TYPES = Object.keys(TYPE_CONFIGS);

const TYPES_BY_DISPLAY = {};
Object.entries(TYPE_CONFIGS)
    .forEach(([type, {display}]) => TYPES_BY_DISPLAY[display] = type);

export {TYPES_BY_DISPLAY};

export function get_answer_on_type_change({
    to_type,
    from_type,
    answer,
}) {
    if (to_type === from_type) {
        return answer;
    }

    switch (to_type) {
        case 'free_form':
            switch (from_type) {
                case '':
                    return '';
                case 'true_false':
                    return '';
                case 'mc_single':
                case 'mc_multiple':
                    return free_from_from_mc_answer(answer);
                case 'ordered':
                    return free_form_from_ordered_answer(answer);
                default:
                    return throw_bad_case_error({from_type, to_type});

            }
        case 'true_false':
            switch (from_type) {
                case '':
                    return false;
                case 'free_form':
                    if (answer.trim()) {
                        throw new AnswerConversionError(false);
                    } else {
                        return false;
                    }
                case 'mc_single':
                case 'mc_multiple':
                case 'ordered':
                    if (!are_empty(answer)) {
                        throw new AnswerConversionError(false);
                    } else {
                        return false;
                    }
                default:
                    return throw_bad_case_error({from_type, to_type});
            }
        case 'ordered':
            switch (from_type) {
                case '':
                    return [TYPE_CONFIGS[to_type].get_empty_ans()];
                case 'true_false':
                    return [];
                case 'free_form':
                    return arrayed_from_free_form(answer, to_type);
                case 'mc_single':
                case 'mc_multiple':
                    return ordered_from_mc_answer(answer);
                default:
                    return throw_bad_case_error({from_type, to_type});
            }
        case 'mc_single':
            switch (from_type) {
                case '':
                    return [TYPE_CONFIGS[to_type].get_empty_ans()];
                case 'true_false':
                    return [];
                case 'free_form':
                    return arrayed_from_free_form(answer, to_type);
                case 'mc_multiple':
                    return mc_single_from_mc_multiple_answer(answer);
                case 'ordered':
                    return mc_from_ordered(answer);
                default:
                    return throw_bad_case_error({from_type, to_type});

            }
        case 'mc_multiple':
            switch (from_type) {
                case '':
                    return [TYPE_CONFIGS[to_type].get_empty_ans()];
                case 'true_false':
                    return [];
                case 'ordered':
                    return mc_from_ordered(answer);
                case 'mc_single':
                    return mc_multiple_from_mc_single(answer);
                case 'free_form':
                    return arrayed_from_free_form(answer, to_type);
                default:
                    return throw_bad_case_error({from_type, to_type});
            }
    }
}

function mc_multiple_from_mc_single(answer) {
    return answer.filter(a => a.text.trim());
}

function throw_bad_case_error({from_type, to_type}) {
    throw Error(`bad case: from_type="${from_type}", to_type="${to_type}"`);
}

function mc_from_ordered(answer) {
    const at_least_one_complete_ans = answer
        .some(a => a.value !== undefined && a.text.trim());

    const answer_with_false_values = answer.map(a => ({...a, value: false}));
    if (at_least_one_complete_ans) {
        throw new AnswerConversionError(answer_with_false_values);
    } else {
        return answer_with_false_values;
    }
}

function mc_single_from_mc_multiple_answer(answer) {
    let encountered_true = false;
    return answer.map(a => {
        if (a.value) {
            if (encountered_true) {
                return {...a, value: false};
            } else {
                encountered_true = true
                return a;
            }
        } else {
            return a;
        }
    });
}

function arrayed_from_free_form(answer, to_type) {
    const text = answer.trim();
    if (text) {
        const value = to_type === 'ordered' ? '' : true;
        return [{text, value}];
    } else {
        return [];
    }
}

function free_from_from_mc_answer(answer) {
    if (!are_empty(answer)) {
        const true_answer_as_string = answer
            .filter(a => a.value)
            .map(a => a.text.trim())
            .join(', ');

        throw new AnswerConversionError(true_answer_as_string);
    } else {
        return '';
    }
}

function free_form_from_ordered_answer(answer) {
    if (!are_empty(answer)) {
        const answer_with_text = answer
            .filter(a => a.text.trim());

        const sorted_answer_string = sortBy(answer_with_text, 'value')
            .map(a => a.text)
            .join(', ');

        throw new AnswerConversionError(sorted_answer_string);
    } else {
        return '';
    }
}

function ordered_from_mc_answer(answer) {
    return answer.map(({text}) => ({text, value: ''}));
}

function are_empty(answer) {
    if (!answer || answer.length === 0) {
        return true;
    }
    return !answer.some(has_text)
}

function has_text(ans) {
    if (!ans || !ans.text) {
        return false;
    }
    return ans.text.trim() !== '';
}
