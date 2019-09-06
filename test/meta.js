/* global it, describe */
import expect from 'expect';

import {
    get_answer_on_type_change,
    VALID_TYPES,
    TYPE_CONFIGS,
} from '@/meta';
import AnswerConversionError from '@/AnswerConversionError';

describe('get_answer_on_type_change', () => {
    it('covers all possible conversions', () => {
        VALID_TYPES.forEach(to_type => {
            VALID_TYPES.forEach(from_type => {
                let answer = '';
                if (TYPE_CONFIGS[from_type].get_empty_choice) {
                    answer = [TYPE_CONFIGS[from_type].get_empty_choice()];
                }
                try {
                    const converted_answer = get_answer_on_type_change({
                        from_type,
                        to_type,
                        answer,
                    });
                    expect(converted_answer).toBeDefined();
                } catch (e) {
                    try {
                        expect(e).toBeInstanceOf(AnswerConversionError);
                    } catch (_) {
                        throw e;
                    }
                    expect(e.converted_answer).toBeDefined();
                }
            });
        });
    })
});
