import Choice from '@/components/Choice';
import OrderedChoice from '@/components/OrderedChoice';

export const TYPE_CONFIGS = {
    free_form: {
        display: 'Simple',
        on_changed_to_type() {
            return [];
        },
    },
    mc_single: {
        display: 'Multiple Choice -- Single Answer',
        choice_component: Choice,
        get_empty_choice() {
            return {text: '', value: false}
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
        on_changed_to_type(choices) {
            return choices.map(ensure_false);

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
        on_choice_toggled(choices, key) {
            return choices.map((choice) => {
                if (choice.key === key) {
                    return {...choice, value: !choice.value};
                } else {
                    return choice;
                }
            });
        },
        on_changed_to_type(choices) {
            return choices;
        },
    },
    true_false: {
        display: 'True/False',
        on_changed_to_type() {
            return [];
        }
    },
    order: {
        display: 'Order',
        choice_component: OrderedChoice,
        get_empty_choice() {
            return {text: '', value: ''}
        },
        on_changed_to_type(choices) {
            return choices;
        }
    },
};

export const VALID_TYPES = Object.keys(TYPE_CONFIGS);

const TYPES_BY_DISPLAY = {};
Object.entries(TYPE_CONFIGS)
    .forEach(([type, {display}]) => TYPES_BY_DISPLAY[display] = type);

console.log(TYPES_BY_DISPLAY);

export {TYPES_BY_DISPLAY};
