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
            {value: false, text: 'Earth', key: 0},
            {value: false, text: 'The astroid belt', key: 7},
            {value: false, text: 'Alpha Centari', key: 1},
            {value: true, text: 'Venus', key: 3},
        ],
    },
    {
        type: 'mc_multiple',
        prompt: 'Which of the following won an oscar for best picture?',
        answers: [
            {text: 'Dances with Wolves', value: true},
            {text: 'Amadeus', value: true },
            {text: 'Raiders of the Lost Ark', value: false},
            {text: 'E.T. the Extra-Terrestrial', value: false},
            {text: 'The Shining', value: false},
            {text: 'Raging Bull', value: false},
            {text: 'Platoon', value: true},
            {text: 'Rain Man', value: true},
            {text: 'Full Metal Jacket', value: false},
        ],
    },
];
