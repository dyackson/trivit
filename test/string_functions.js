/* global it, describe */
import expect from 'expect';

import {collapse_whitespace} from '@/string_functions';

describe('collapse_whitespace', () => {
    it('does like the html parser', () => {
        expect(collapse_whitespace('a  b\tc')).toEqual('a b c');
        expect(collapse_whitespace(`
            a  \t \n\n b
            c \n\t
            `)).toEqual('a b c');
    });
});


