import AnswerConversionError from '@/AnswerConversionError';
import {sortBy} from 'lodash';
import {standout_html} from '@/string_functions';

export const TYPE_CONFIGS = {
    free_form: {
        display: 'Simple',
    },
    true_false: {
        display: 'True/False',
    },
    mc_single: {
        display: 'Multiple Choice -- Single Answer',
        get_empty_ans(key_holder) {
            return {text: '', value: false, key: key_holder.key++}
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
        get_empty_ans(key_holder) {
            return {text: '', value: false, key: key_holder.key++}
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
        get_empty_ans(key_holder) {
            return {text: '', value: '', key: key_holder.key++}
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
    key_holder,
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
                        const then_msg = `
                            You'll lose your answer.
                        `;
                        throw new AnswerConversionError(false, then_msg);
                    } else {
                        return false;
                    }
                case 'mc_single':
                case 'mc_multiple':
                    if (!are_empty(answer)) {
                        const then_msg = `
                            You'll lose your answers.
                        `;
                        throw new AnswerConversionError(false, then_msg);
                    } else {
                        return false;
                    }
                case 'ordered':
                    if (!are_empty_ordered_answer(answer)) {
                        const then_msg = `
                            You'll lose your answers.
                        `;
                        throw new AnswerConversionError(false, then_msg);
                    } else {
                        return false;
                    }
                default:
                    return throw_bad_case_error({from_type, to_type});
            }
        case 'ordered':
            switch (from_type) {
                case '':
                case 'true_false':
                    return [TYPE_CONFIGS[to_type].get_empty_ans(key_holder)];
                case 'free_form':
                    return arrayed_from_free_form(answer, to_type, key_holder);
                case 'mc_single':
                case 'mc_multiple':
                    return ordered_from_mc_answer(answer);
                default:
                    return throw_bad_case_error({from_type, to_type});
            }
        case 'mc_single':
            switch (from_type) {
                case '':
                case 'true_false':
                    return [TYPE_CONFIGS[to_type].get_empty_ans(key_holder)];
                case 'free_form':
                    return arrayed_from_free_form(answer, to_type, key_holder);
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
                case 'true_false':
                    return [TYPE_CONFIGS[to_type].get_empty_ans(key_holder)];
                case 'ordered':
                    return mc_from_ordered(answer);
                case 'mc_single':
                    return answer;
                case 'free_form':
                    return arrayed_from_free_form(answer, to_type, key_holder);
                default:
                    return throw_bad_case_error({from_type, to_type});
            }
    }
}

function throw_bad_case_error({from_type, to_type}) {
    throw Error(`bad case: from_type="${from_type}", to_type="${to_type}"`);
}

function mc_from_ordered(answer) {
    const theres_an_answer_with_value = answer.some(has_value);
    answer = answer.map(ans => ({...ans, value: false}));

    if (theres_an_answer_with_value) {
        const then_msg = `
            You'll lose the ordering values.
        `;
        throw new AnswerConversionError(answer, then_msg);
    } else {
        return answer;
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

function arrayed_from_free_form(answer, to_type, key_holder) {
    const text = answer.trim();
    if (text) {
        const value = to_type === 'ordered' ? '' : true;
        return [{text, value, key: key_holder.key++}];
    } else {
        return [TYPE_CONFIGS[to_type].get_empty_ans(key_holder)];
    }
}

function free_from_from_mc_answer(answer) {
    if (!are_empty(answer)) {
        const true_answer_as_string = answer
            .filter(a => a.value)
            .map(a => a.text.trim())
            .join(', ');
        const then_msg = true_answer_as_string
            ? `
                The new answer will be ${standout_html(true_answer_as_string)},
                but you can adjust it after the type change.
                `
            : `You'll lose your answers.`;
        throw new AnswerConversionError(true_answer_as_string, then_msg);
    } else {
        return '';
    }
}

function free_form_from_ordered_answer(answer) {
    if (!are_empty_ordered_answer(answer)) {
        const answer_with_text = answer
            .filter(a => a.text.trim());

        // this step is necessary because sortBy puts the empty string first
        // (bad), but undefined last (good)
        const with_empty_value_as_undefined = answer_with_text
            .map(a => {
                if (!has_value(a)) {
                    return {...a, value: undefined};
                } else {
                    return a;
                }
            });

        const sorted_answer_string =
            sortBy(with_empty_value_as_undefined, 'value')
            .map(a => has_value(a)
                ? `${a.text} (${a.value})`
                : a.text)
            .join(', ');

        const then_msg = `
            the new answer will be ${standout_html(sorted_answer_string)}, but you can adjust
            it after changing types.
        `;
        throw new AnswerConversionError(sorted_answer_string, then_msg);
    } else {
        return '';
    }
}

function ordered_from_mc_answer(answer) {
    return answer.map((ans) => ({...ans, value: ''}));
}

function are_empty(answer) {
    if (!answer || answer.length === 0) {
        return true;
    }
    return !answer.some(has_text)
}

function are_empty_ordered_answer(answer) {
    if (!answer || answer.length === 0) {
        return true;
    }
    const theres_a_nonempty_anwer =
        answer.some(has_text) || answer.some(has_value);

    return !theres_a_nonempty_anwer;
}

function has_value(ans) {
    const value = ans.value;
    return value !== undefined
        && value !== null
        && !(typeof value === 'string' && value.trim() === '');
}

function has_text(ans) {
    if (!ans || !ans.text) {
        return false;
    }
    return ans.text.trim() !== '';
}
