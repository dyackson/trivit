/* global it, describe */
import shuffle from '@/shuffle';

import expect from 'expect';

describe('shuffle', () => {
    it('returns a shallow copy of an array in random order', () => {
        const ray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const refCopy = ray;
        const shallowCopy = ray.map(i => i);
        const shuffled = shuffle(ray);
        expect(shuffled.length).toEqual(ray.length);
        ray.forEach((item) => {
            expect(shuffled.includes(item));
        });

        // don't change the original
        expect(ray).toBe(refCopy);
        expect(ray).toEqual(shallowCopy);
    });
});
