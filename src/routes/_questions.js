import {collapse_whitespace} from '@/string_functions';
export default [
    {
        type: 'true_false',
        prompt: collapse_whitespace(`
            Rocky won an Oscar for best picture.
        `),
        answer: true,
    },
    {
        type: 'true_false',
        prompt: collapse_whitespace(`
            Avatar won an Oscar for best picture.
        `),
        answer: false,
    },
    {
        type: 'free_form',
        prompt: collapse_whitespace(`
            What 1991 movie directed by Gus Van Sant has a title derived from
            the title of a B-52's song?
            `),
        answer: 'My Own Private Idaho',
    },
    {
        type: 'mc_single',
        prompt: 'Which is closest to the sun?',
        answer: [
            {value: false, text: 'Earth', key: 9},
            {value: false, text: 'The astroid belt', key: 7},
            {value: false, text: 'Alpha Centari', key: 1},
            {value: true, text: 'Venus', key: 3},
        ],
    },
    {
        type: 'mc_multiple',
        prompt: 'Which of the following won an oscar for best picture?',
        answer: [
            {key: 0, text: 'Dances with Wolves', value: true},
            {key: 1, text: 'Amadeus', value: true },
            {key: 2, text: 'Raiders of the Lost Ark', value: false},
            {key: 3, text: 'E.T. the Extra-Terrestrial', value: false},
            {key: 4, text: 'The Shining', value: false},
            {key: 7, text: 'Raging Bull', value: false},
            {key: 6, text: 'Platoon', value: true},
            {key: 8, text: 'Rain Man', value: true},
            {key: 5, text: 'Full Metal Jacket', value: false},
        ],
    },
];
