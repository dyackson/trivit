import {isHttpsUri} from 'valid-url';
import InvalidQuestion from '@/InvalidQuestion';
export const VALID_TYPES = ['free_form', 'mc_single', 'mc_multiple', 'true_false', 'order'];

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
        _id,
        owner_id,
    } = question;

    const valid_question = Object.assign({}, {
        _id,
        owner_id,
        type: get_valid_type(type),
        prompt: get_valid_prompt(prompt),
        choices: get_valid_choices({choices, type}),
        answer: get_valid_answer({answer, type}),
        tags: get_valid_tags(tags),
        links: get_valid_links(links),
    });

    return without_undefined_fields(valid_question);
}

function without_undefined_fields(obj) {
    return JSON.parse(JSON.stringify(obj));
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
    if (type === 'true_false' || type === 'free_form') {
        if (choices) {
            throw new InvalidQuestion(
                `type ${type} should not have choices, choices: ${choices}`);
        }
        return;
    } else {
        error_if_empty_or_non_array(choices);
        error_if_one_is_not_an_object(choices);

        if (type === 'mc_single' || type === 'mc_multiple') {
            error_if_wrong_number_of_correct_answers(choices, type);
        } else if (type === 'order') {
            error_if_a_choice_value_is_not_sortable(choices);
        }

        let trimmed_choices = get_trimmed_choices(choices);

        return trimmed_choices;
    }
}

function error_if_empty_or_non_array(choices) {
    const choices_is_empty = !Array.isArray(choices) || !choices.length;
    if (choices_is_empty) {
        throw new InvalidQuestion(
            `choices must be a non-empty array: ${choices}`);
    }
}

function error_if_wrong_number_of_correct_answers(choices, type) {
    const correct_count = choices.filter(({value}) => {
        if (typeof value !== 'boolean' && value != undefined) {
            throw new InvalidQuestion(
                `non-boolean, non-empty choice value for: ${value}`);
        }
        return value;
    }).length;

    if (type === 'mc_single' && correct_count !== 1) {
        throw new InvalidQuestion(
            `mc_single type must have exactly one correct answer`);
    } else if (type === 'mc_multiple' && correct_count === 0) {
        throw new InvalidQuestion(
            `mc_multiple type must have at least correct answer`);
    }
}

function error_if_one_is_not_an_object(choices) {
    choices.forEach((choice, i) => {
        if (!(choice instanceof Object)) {
            throw new InvalidQuestion(
                `type is order but choice ${i} is not an object: ${choice}`);
        }
    });
}

function error_if_a_choice_value_is_not_sortable(choices) {
    choices.forEach((choice, i) => {
        if (typeof choice.value !== 'number') {
            throw new InvalidQuestion(
                `type is order but choice ${i} value not a number: ${choice}`);
        }
    });
}

function get_trimmed_choices(choices) {
    const choice_texts = choices.map(c => c.text);

    const trimmed_choice_texts = choice_texts.map((choice, i) => {
        if (typeof choice !== 'string') {
            throw new InvalidQuestion(
                `choice.${i}.text is not a string: ${choice}`);
        }
        const trimmed = choice.trim();
        if (!trimmed.length) {
            throw new InvalidQuestion(
                `choice ${i} has empty text: ${choice}`);
        }
        return trimmed;
    })

    if (!isUnique(trimmed_choice_texts)) {
        throw new InvalidQuestion(`mc_multiple choices are identical`);
    }

    const trimmed_choices = trimmed_choice_texts.map((text, i) => {
        return {text, value: choices[i].value};
    });

    return trimmed_choices;
}

export function get_valid_answer({answer, type}) {
    switch (type) {
        case 'true_false': {
            if (typeof answer !== 'boolean') {
                throw new InvalidQuestion(
                    `non-boolean true_false answer: ${answer}`);
            }
            return answer;
        }
        case 'free_form': {
            if (typeof answer !== 'string') {
                throw new InvalidQuestion(
                    `non-string free_form answer: ${answer}`);
            }
            const trimmed_answer = answer.trim();
            if (!trimmed_answer.length) {
                throw new InvalidQuestion(
                    `blank string free_form answer: "${answer}"`);
            }
            return trimmed_answer;
        }
        default: {
            if (answer !== undefined) {
                throw new InvalidQuestion(
                    `${type} should not have an answer: ${answer}`);
            }
        }
    }

    return answer;
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
