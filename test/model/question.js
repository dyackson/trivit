const expect = require('expect');

const src = path => require(`../../src/${path}`);

const {connect} = src('connect_db');
const {
    create_question,
    update_question,
    get_question_by_id,
    find_questions,
} = src('model/question');

describe('tests', () => {
    let close;
    before(function() {
        close = connect();
    });
    after(function() {
        close();
    });

    it('runs good', async() => {
        const question = {
            type: 'single',
            prompt:  `What's the answer?`,
            choices: ['this', 'that', 'the other'],
            answer:  2,
            tags: ['simple', 'test'],
            links: ['www.clownpenis.fart'],
            creator: 'my_user_id',
        };

        const id = await create_question(question);

        expect(id).toBeTruthy();
        console.log(id);
    });
});
