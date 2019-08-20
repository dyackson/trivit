<script>
    import {onMount} from 'svelte';
    import {questions} from '@/fake_data';
    let save_question, get_questions, test_query;
    import {login_anonymous, logout, login_google}
        from '@/db/get_db_and_user_id';
    import * as store from '@/store';

    onMount(async () => {
        store.import_stitch();
    });

    let response;
    async function testIt() {
        const save_proms = questions.map(save_question);
        await Promise.all(save_proms);

        const saved_questions = await get_questions();
        console.dir(saved_questions);
        response = saved_questions;
    }

</script>
<style>
h1, figure, p {
    text-align: center;
    margin: 0 auto;
}

    h1 {
        font-size: 2.8em;
        text-transform: uppercase;
        font-weight: 700;
        margin: 0 0 0.5em 0;
        background: cadetblue;
    }

    figure {
        margin: 0 0 1em 0;
    }

    img {
        width: 100%;
        max-width: 400px;
        margin: 0 0 1em 0;
    }

    p {
        margin: 1em auto;
    }

    @media (min-width: 480px) {
        h1 {
            font-size: 4em;
        }
    }
</style>



<div>
    {JSON.stringify($store.user)}
</div>
<button type=button on:click={login_anonymous}>
    Login Anon
</button>
<button type=button on:click={logout}>
    Login Anon
</button>

<svelte:head>
<title>I'll be damned</title>
</svelte:head>

<h1>Great success, huh!</h1>

<figure>
    <img alt='Borat' src='great-success.png'>
    <figcaption>HIGH FIVE!</figcaption>
</figure>

<p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.</strong></p>
