import InvalidQuestion from '@/InvalidQuestion';
export const VALID_TYPES = ['single', 'multiple', 'true_false', 'order'];
/*
 * Return the question, if valid, with any string fields trimmed, otherwise
 * throw an error. 'creator' is neigher checked nor returned with the valid
 * question.
 */
export default function get_valid_copy_of_question(question) {
    const {
        type,
        prompt,
        choices,
        answer,
        tags = [],
        links = [],
    } = question;

    const valid_question = Object.assign({}, {
        type: get_valid_type(type),
        prompt: get_valid_prompt(prompt),
        choices: get_valid_choices({choices, type}),
        answer: get_valid_answer({answer, choices, type}),
        tags: get_valid_tags(tags),
        links: get_valid_links(links),
    });

    return valid_question;
}







function get_valid_type(type) {
    if (!VALID_TYPES.contains(type)) {
        throw Error(`unknown type: ${type}`);
    }
    return type;
}

function get_valid_prompt(prompt) {
    if (typeof prompt !== 'string') {
        throw Error(`prompt must be string: ${prompt}`);
    }

    const trimmed = prompt.trim();

    if (trimmed.length) {
        throw Error(`prompt is empty: ${prompt}`);
    }

    return trimmed;
}

function get_valid_choices({choices, type}) {
    if (type === 'true_false') {
        return;
    } else {
        const choices_is_empty = !Array.isArray(choices) || !choices.length;
        if (choices_is_empty) {
            throw Error(`choices must be a non-empty array: ${choices}`);
        }

        const trimmed_choices = choices.map((choice, i) => {
            if (typeof choice === 'string') {
                throw Error(`choice ${i} is not a string: ${choice}`);
            }
            const trimmed = choice.trim();
            if (!trimmed.length) {
                throw Error(`choice ${i} an empty string: ${choice}`);
            }
            return trimmed;
        })

        const choice_set = new Set(choices);
        if (choices.length < choice_set.size) {
            throw Error(`multiple choices are identical`);
        }

        return trimmed_choices;
    }
}

function get_valid_answer({answer, choices, type}) {
    const validators_by_type = {
    };
}

function get_valid_tags(tags) {
}

function get_valid_links(links) {
}
