<script context=module>
    import {TYPE_CONFIGS} from '@/meta';
    const config = TYPE_CONFIGS.mc_multiple;
</script>

<script>
    import Prompt from '@/components/Prompt';
    import Bool from '@/components/Bool';
    import MCMChoice from '@/components/MCMChoice';
    export let prompt;
    export let answer;
    export let show_answer = false;

    let guess = answer.map(a => ({...a, correct: a.value, value: false}));

    let response = '';


    function on_toggle(key) {
        guess = config.on_toggle(guess, key);
    }

    function submit() {
        const correct_count = guess
            .filter(g => g.value === g.correct)
            .length;

        if (correct_count === guess.length) {
            response = 'Correct';
        } else {
            response = 'Wrong';
            if (correct_count) {
                response = `${response}. But you were
                    ${correct_count}/${guess.length} right.`;
            }
        }
        show_answer = true;
    }

    function reset() {
        response = '';
        guess = guess.map(g => ({...g, value: false}));
        show_answer = false;
    }
</script>


<style>
</style>

<Prompt text={prompt} />

<div class='content is-large'>
    {#if show_answer}
    <table class="smaller">
        <thead>
            <tr>
                <th>Choice</th>
                <th>Your guess</th>
                <th>Actual</th>
                <th>Were you rigth</th>
            </tr>
        </thead>
        <tbody>
            {#each guess as g (g.key)}
                <tr>
                    <td>{g.text}</td>
                    <td>{g.value}</td>
                    <td>{g.correct}</td>
                    <td>{g.correct === g.value ? 'yes' : 'no'}</td>
                </tr>
            {/each}
        </tbody>
    </table>
        <p>
            {response}
        </p>
        <button class='button is-fullwidth' on:click={reset} >
            Reset
        </button>
    {:else}
        {#each guess as g (g.key)}
            <MCMChoice
                text={g.text}
                reveal_correctness={show_answer}
                on_click={() => on_toggle(g.key)}
                correct={g.correct}
                value={g.value} />
        {/each}
        <br>
        <button class='button is-fullwidth' on:click={submit} >
            Submit
        </button>
    {/if}
</div>
