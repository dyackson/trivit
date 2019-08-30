export const TYPE_CONFIGS = {
    free_form: {
        display: 'Simple',
    },
    mc_single: {
        display: 'Multiple Choice -- Single Answer',
        get_empty_choice() {
            return {text: '', value: false}
        },
    },
    mc_multiple: {
        display: 'Multiple Choice -- Multiple Answers',
        get_empty_choice() {
            return {text: '', value: false}
        },
    },
    true_false: {
        display: 'True/False',
    },
    order: {
        display: 'Order',
        get_empty_choice() {
            return {text: '', value: ''}
        },
    },
};

export const VALID_TYPES = Object.keys(TYPE_CONFIGS);

const TYPES_BY_DISPLAY = {};
Object.entries(TYPE_CONFIGS)
    .forEach(([type, {display}]) => TYPES_BY_DISPLAY[display] = type);

console.log(TYPES_BY_DISPLAY);

export {TYPES_BY_DISPLAY};
