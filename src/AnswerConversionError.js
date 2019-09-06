// does not take a message as the param, instead takes the would-be answer if
// converted.
export default class AnswerConversionError extends Error {
    constructor(converted_answer, ...rest) {
        super('Converting answer between types will lose data', ...rest);
        this.name = 'AnswerConversionError';
        this.converted_answer = converted_answer;
    }
}

