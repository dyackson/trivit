export const questions = [
    // true_false
    {
        type: 'true_false',
            prompt: 'Is Paul dead',
            answer: false,
            tags: ['beatles'],
            links: ['https://en.wikipedia.org/wiki/Paul_is_dead'],
    },
    {
        type: 'true_false',
        prompt: 'Is John dead',
        answer: true,
        tags: ['beatles'],
        links: ['https://en.wikipedia.org/wiki/John_Lennon'],
    },
    // single
    {
        type: 'single',
        prompt: 'Who was the drummer',
        choices: ['John', 'Paul', 'George', 'Ringo'],
        answer: 3,
        tags: ['beatles'],
        links: ['https://en.wikipedia.org/wiki/The_Beatles'],
    },
    // multiple
    {
        type: 'multiple',
        prompt: 'Who could play drums',
        choices: ['John', 'Paul', 'George', 'Ringo'],
        answer: [1, 3],
        tags: ['beatles'],
        links: ['https://en.wikipedia.org/wiki/The_Beatles'],
    },
    // ordered
    {
        type: 'order',
        prompt: 'Order by year of Release',
        choices: [
            {string: 'Sgt Pepper', sort_value: 1967},
            {string: 'Please, Please Me', sort_value: 1963},
            {string: 'Let It Be', sort_value: 1970},
            {string: 'Help', sort_value: 1965},
        ],
        tags: ['beatles'],
        links: ['https://en.wikipedia.org/wiki/The_Beatles'],
    },
];

