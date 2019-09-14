import {collapse_whitespace} from '@/string_functions';

// does not take a description message as the first param param, instead takes
// the would-be answer if converted, plus a message that describes the result of
// the conversion.
export default class AnswerConversionError extends Error {
    constructor(converted_answer, then_msg, ...rest) {
        super('Converting answer between types will lose data', ...rest);
        this.name = 'AnswerConversionError';
        this.converted_answer = converted_answer;
        this.then_msg = collapse_whitespace(then_msg || '');
    }
}

