import Choice from '@/components/Choice';
import OrderedChoice from '@/components/OrderedChoice';

export const TYPE_CONFIGS = {
    free_form: {
        display: 'Simple',
        loses_data_when_changing(from_type, choice) {
            return !are_empty(choice);
        },
        on_changed_to_type(choices, from_type) {
            switch (from_type) {
                case 'mc_single':
                case 'mc_multiple':
                default:
                    return [];
            }
        },
    },
    mc_single: {
        display: 'Multiple Choice -- Single Answer',
        choice_component: Choice,
        get_empty_choice() {
            return {text: '', value: false}
        },
        loses_data_when_changing(from_type, choices) {
            if (are_empty(choices)) {
                return false;
            }
            return from_type !== 'mc_multiple';
        },
        on_choice_toggled(choices, key) {
            const toggled = choices.find((choice) => choice.key === key);

            if (toggled.value) {
                return make_toggled_false();
            }  else {
                return make_toggled_the_only_true();
            }

            function make_toggled_false() {
                return choices.map((choice) => {
                    if (choice.key === key) {
                        return {...choice, value: false};
                    } else {
                        return choice;
                    }
                });
            }

            function make_toggled_the_only_true() {
                return choices.map((choice) => {
                    if (choice.key === key) {
                        return {...choice, value: true};
                    } else if (choice.value) {
                        return {...choice, value: false};
                    } else {
                        // it's already false
                        return choice;
                    }
                });
            }
        },
        on_changed_to_type(choices, from_type) {
            switch (from_type) {
                case 'mc_multiple':
                case 'ordered':
                    return choices.map(ensure_false);
                default:
                    return [];
            }

            function ensure_false(choice) {
                if (choice.value) {
                    return {...choice, value: false};
                } else {
                    return choice;
                }
            }
        },
    },
    mc_multiple: {
        display: 'Multiple Choice -- Multiple Answers',
        choice_component: Choice,
        get_empty_choice() {
            return {text: '', value: false}
        },
        loses_data_when_changing(from_type, choices) {
            if (are_empty(choices)) {
                return false;
            }
            return from_type !== 'mc_single';
        },
        on_choice_toggled(choices, key) {
            return choices.map((choice) => {
                if (choice.key === key) {
                    return {...choice, value: !choice.value};
                } else {
                    return choice;
                }
            });
        },
        on_changed_to_type(choices, from_type) {
            switch (from_type) {
                case 'mc_single':
                    return choices;
                case 'ordered':
                    return choices.map(with_false_value);
                default:
                    return [];
            }

            function with_false_value(choice) {
                return {...choice, value: false};
            }
        },
    },
    true_false: {
        display: 'True/False',
        loses_data_when_changing(from_type, choices) {
            return !are_empty(choices);
        },
        on_changed_to_type() {
            return [];
        }
    },
    ordered: {
        display: 'Ordered',
        choice_component: OrderedChoice,
        get_empty_choice() {
            return {text: '', value: ''}
        },
        loses_data_when_changing() {
            return false;
        },
        on_changed_to_type(choices, from_type) {
            switch (from_type) {
                case 'mc_single':
                case 'mc_multiple':
                    return choices.map(without_value);
                default:
                    return [];
            }

            function without_value(choice) {
                return {...choice, value: ''};
            }
        }
    },
};

function are_empty(choices) {
    if (!choices || choices.length === 0) {
        return true;
    }
    return !choices.some(has_text)
}

function has_text(choice) {
    if (!choice || !choice.text) {
        return false;
    }
    return choice.text.trim() !== '';
}

export const VALID_TYPES = Object.keys(TYPE_CONFIGS);

const TYPES_BY_DISPLAY = {};
Object.entries(TYPE_CONFIGS)
    .forEach(([type, {display}]) => TYPES_BY_DISPLAY[display] = type);

console.log(TYPES_BY_DISPLAY);

export {TYPES_BY_DISPLAY};
