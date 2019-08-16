import {isHttpsUri} from 'valid-url';
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
        if (choices) {
            throw new InvalidQuestion(
                `choices not valid for true_false, choices: ${choices}`);
        }
        return;
    } else {
        const choices_is_empty = !Array.isArray(choices) || !choices.length;
        if (choices_is_empty) {
            throw new InvalidQuestion(
                `choices must be a non-empty array: ${choices}`);
        }
        let choice_strings = choices;

        if (type === 'order') {
            choices.forEach(error_if_not_object_with_numeric_sort_value);
            choice_strings = choices.map(c => c.string);
        }

        let trimmed_choices = get_trimmed_choices(choice_strings);

        if (type === 'order') {
            trimmed_choices = trimmed_choices.map((string, i) => {
                return {string, sort_value: choices[i].sort_value};
            });
        }

        return trimmed_choices;
    }
}

function error_if_not_object_with_numeric_sort_value(choice, i) {
    if (!(choice instanceof Object)) {
        throw new InvalidQuestion(
            `type is order but choice ${i} is not an object: ${choice}`);
    }

    if (typeof choice.sort_value !== 'number') {
        throw new InvalidQuestion(
            `type is order but choice ${i} sort_value not a number: ${choice}`);
    }
}

function get_trimmed_choices(choices) {
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

    if (!isUnique(trimmed_choices)) {
        throw new InvalidQuestion(`multiple choices are identical`);
    }

    return trimmed_choices;
}

export function get_valid_answer({answer, choices, type}) {
    const validators_by_type = {
        true_false,
        single,
        multiple,
        order,
    };

    return validators_by_type[type]({choices, answer});

    function true_false({answer}) {
        if (typeof answer !== 'boolean') {
            throw new InvalidQuestion(
                `non-boolean true_false answer: ${answer}`);
        }
        return answer;
    }

    function single({answer, choices}) {
        if (!Number.isInteger(answer)) {
            throw new InvalidQuestion(
                `single type with non-integer answer: ${answer}`);
        }
        if (!choices[answer]) {
            throw new InvalidQuestion(
                `single type answer not a choice index: ${answer}`);
        }
        return answer;
    }

    // answer is an arrary, maybe empty, of choice indices
    function multiple({answer, choices}) {
        if (!Array.isArray(answer)) {
            throw new InvalidQuestion(
                `multiple type answer not an array: ${answer}`);
        }
        answer.forEach(item => {
            if (!Number.isInteger(item)) {
                throw new InvalidQuestion(
                    `multiple type answer item not an integer: ${item}`);
            }
            if (!choices[item]) {
                throw new InvalidQuestion(
                    `multiple type answer item not choice index: ${item}`);
            }
        });

        if (!isUnique(answer)) {
            throw new InvalidQuestion(
                `multiple type answer contains duplicate indices: ${answer}`);
        }

        return answer;
    }

    // The choices themselves will be ordered correctly, but mixed up when
    // presented, so no answer is necessary.
    function order({answer}) {
        if (answer != null) {
            throw new InvalidQuestion(
                `type order has no answer, answer: ${answer}`);
        }
    }
}

export function get_valid_tags(tags) {
    if (!Array.isArray(tags)) {
        throw new InvalidQuestion(
            `tags must be an array: ${tags}`);
    }

    const trimmed_tags = tags.map((tag, i) => {
        if (typeof tag !== 'string') {
            throw new InvalidQuestion(
                `tag ${i} is not a string: ${tag}`);
        }
        const trimmed = tag.trim();
        if (!trimmed.length) {
            throw new InvalidQuestion(
                `tag ${i} an empty string: ${tag}`);
        }
        return trimmed;
    })

    if (!isUnique(trimmed_tags)) {
        throw new InvalidQuestion(
            `tags has duplicate items: ${tags}`);
    }

    return trimmed_tags;
}

export function get_valid_links(links) {
    if (!Array.isArray(links)) {
        throw new InvalidQuestion(
            `links must be an array: ${links}`);
    }

    const valid_links = links.map((link) => {
        if (typeof link !== 'string') {
            throw new InvalidQuestion(
                `link must be a string: ${link}`);
        }
        const valid_link = isHttpsUri(link.trim());
        if (!valid_link) {
            throw new InvalidQuestion(
                `invalid link: ${link}`);
        }
        return link;
    });

    if (!isUnique(valid_links)) {
        throw new InvalidQuestion(
            `links has duplicate items: ${links}`);
    }
    return valid_links;
}

function isUnique(array) {
    const set = new Set(array);
    return set.size == array.length;
}
