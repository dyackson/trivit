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







export function get_valid_type(type) {
    if (!VALID_TYPES.includes(type)) {
        throw new InvalidQuestion(`unknown type: ${type}`);
    }
    return type;
}

export function get_valid_prompt(prompt) {
    if (typeof prompt !== 'string') {
        throw new InvalidQuestion(`prompt must be string: ${prompt}`);
    }

    const trimmed = prompt.trim();

    if (!trimmed.length) {
        throw new InvalidQuestion(`prompt is empty: ${prompt}`);
    }

    return trimmed;
}

export function get_valid_choices({choices, type}) {
    if (type === 'true_false') {
        return;
    } else {
        const choices_is_empty = !Array.isArray(choices) || !choices.length;
        if (choices_is_empty) {
            throw new InvalidQuestion(
                `choices must be a non-empty array: ${choices}`);
        }

        const trimmed_choices = choices.map((choice, i) => {
            if (typeof choice !== 'string') {
                throw new InvalidQuestion(
                    `choice ${i} is not a string: ${choice}`);
            }
            const trimmed = choice.trim();
            if (!trimmed.length) {
                throw new InvalidQuestion(
                    `choice ${i} an empty string: ${choice}`);
            }
            return trimmed;
        })

        const choice_set = new Set(trimmed_choices);
        if (choices.length !== choice_set.size) {
            throw new InvalidQuestion(`multiple choices are identical`);
        }

        return trimmed_choices;
    }
}

export function get_valid_answer({answer, choices, type}) {
    const validators_by_type = {
    };
}

export function get_valid_tags(tags) {
}

export function get_valid_links(links) {
}
