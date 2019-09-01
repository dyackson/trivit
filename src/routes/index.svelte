<script>
    import {questions} from '@/fake_data';
    import {save_question, get_questions} from '@/db/questions';
    import * as store from '@/store';


    let user = store.user;

    let response;
    async function test_post_and_get() {
        const save_proms = questions.map(save_question);
        await Promise.all(save_proms);

        const saved_questions = await get_questions();
        console.dir(saved_questions);
        response = saved_questions;
    }
</script>

<button type=button on:click={test_post_and_get}>
    test post and get
</button>
{JSON.stringify(response)}

<svelte:head>
    <title>Trivit</title>
</svelte:head>

