<script>
    import {onMount} from 'svelte';
    import {questions} from '@/fake_data';
    import {save_question, get_questions} from '@/db/questions';
    import {login_anonymous, logout, login_google} from '@/login_logout';

    import * as store from '@/store';

    let user = store.user;

    onMount(async () => {
        store.import_stitch();
    });

    let response;
    async function test_post_and_get() {
        const save_proms = questions.map(save_question);
        await Promise.all(save_proms);

        const saved_questions = await get_questions();
        console.dir(saved_questions);
        response = saved_questions;
    }

</script>
<style>
</style>



<div>
    {Object.entries($user || {})}
</div>
<button class=button type=button on:click={login_anonymous}>
    Login Anon
</button>
<button type=button on:click={login_google}>
    Login Google
</button>
<button type=button on:click={logout}>
    Logout
</button>

<br>

<button type=button on:click={test_post_and_get}>
    test post and get
</button>
{JSON.stringify(response)}

<svelte:head>
<title>I'll be damned</title>
</svelte:head>

