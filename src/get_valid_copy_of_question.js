import {isHttpsUri} from 'valid-url';
import InvalidQuestion from '@/InvalidQuestion';
import {VALID_TYPES} from '@/meta';

/*
 * Return the question, if valid, with any string fields trimmed, otherwise
 * throw an error. 'creator' is neigher checked nor returned with the valid
 * question.
 */
export default function get_valid_copy_of_question(question) {
    const {
        type,
        prompt,
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

export function get_valid_answer({answer, type}) {
    if (type === 'true_false') {
        return get_valid_true_false_answer(answer);
    } else if (type === 'free_form') {
        return get_valid_free_form_answer(answer);
    } else {
        error_if_empty_or_non_array(answer);
        error_if_one_is_not_an_object(answer);

        if (type === 'mc_single' || type === 'mc_multiple') {
            error_if_wrong_number_of_correct_answers(answer, type);
        } else if (type === 'ordered') {
            error_if_an_answer_value_is_not_sortable(answer);
        }

        let trimmed_answer = get_trimmed_answer(answer);

        return trimmed_answer;
    }
}

function get_valid_true_false_answer(answer) {
    if (typeof answer !== 'boolean') {
        throw new InvalidQuestion(
            `true_false must have boolean answer: ${answer}`);
    } else {
        return answer;
    }
}

function get_valid_free_form_answer(answer) {
    if (typeof answer !== 'string') {
        throw new InvalidQuestion(
            `free_form must have string answer: ${answer}`);
    }
    const trimmed_answer = answer.trim();

    if (!trimmed_answer.length) {
        throw new InvalidQuestion(
            `free_form must non-empty answer: ${answer}`);
    }

    return trimmed_answer;
}

function error_if_empty_or_non_array(answer) {
    const answer_is_empty = !Array.isArray(answer) || !answer.length;
    if (answer_is_empty) {
        throw new InvalidQuestion(
            `answer must be a non-empty array: ${answer}`);
    }
}

function error_if_wrong_number_of_correct_answers(answer, type) {
    const correct_count = answer.filter(({value}) => {
        if (typeof value !== 'boolean' && value != undefined) {
            throw new InvalidQuestion(
                `non-boolean, non-empty answer value for: ${value}`);
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

function error_if_one_is_not_an_object(answer) {
    answer.forEach((ans, i) => {
        if (!(ans instanceof Object)) {
            throw new InvalidQuestion(
                `type is order but answer ${i} is not an object: ${ans}`);
        }
    });
}

function error_if_an_answer_value_is_not_sortable(answer) {
    answer.forEach((ans, i) => {
        if (typeof ans.value !== 'number') {
            throw new InvalidQuestion(
                `type is order but answer ${i} value not a number: ${ans}`);
        }
    });
}

function get_trimmed_answer(answer) {
    const answer_texts = answer.map(a => a.text);

    const trimmed_answer_texts = answer_texts.map((text, i) => {
        if (typeof text !== 'string') {
            throw new InvalidQuestion(
                `answer.${i}.text is not a string: ${text}`);
        }
        const trimmed = text.trim();
        if (!trimmed.length) {
            throw new InvalidQuestion(
                `answer ${i} has empty text: ${text}`);
        }
        return trimmed;
    })

    if (!is_unique(trimmed_answer_texts)) {
        throw new InvalidQuestion(`mc_multiple answer are identical`);
    }

    const trimmed_answer = trimmed_answer_texts.map((text, i) => {
        return {text, value: answer[i].value};
    });

    return trimmed_answer;
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

    if (!is_unique(trimmed_tags)) {
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

    if (!is_unique(valid_links)) {
        throw new InvalidQuestion(
            `links has duplicate items: ${links}`);
    }
    return valid_links;
}

function is_unique(array) {
    const set = new Set(array);
    return set.size == array.length;
}
