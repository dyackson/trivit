<script context=module>
    import {TYPE_CONFIGS} from '@/meta';
    const config = TYPE_CONFIGS.mc_single;
</script>

<script>
    import Prompt from '@/components/Prompt';
    import Bool from '@/components/Bool';
    import Ans from '@/components/Ans';
    export let prompt;
    export let answer;
    export let show_answer = false;

    const correct_ans = answer.find(a => a.value);

    let guess = answer.map(a => ({...a, value: false}));

    let response = '';

    function on_toggle(key) {
        guess = config.on_toggle(guess, key);
    }

    function submit() {
        const selected_g = guess.find(g => g.value);
        if (!selected_g) {
            alert(`Pick an answer`);
        } else {
            if (selected_g.key === correct_ans.key) {
                response = 'Correct';
            } else {
                response = 'Wrong';
            }
            show_answer = true;
        }
    }

    function reset() {
        response = '';
        guess = guess.map(g => ({...g, value: false}));
        show_answer = false;
    }
</script>


<Prompt text={prompt} />

<div class='content is-large'>
{#if show_answer}
    <!-- TODO: show a checkmark or X icon -->
    <p>
        {response}, it's {correct_ans.text}.
    </p>
    <button class='button' on:click={reset} >
        Reset
    </button>
{:else}
    {#each guess as g (g.key)}
    <Ans
        bind:text={g.text}
        bind:value={g.value}
        toggle={() => on_toggle(g.key)}
        play_mode=true
        />
    {/each}
    <button class='button' on:click={submit} >
        Submit
    </button>
{/if}
</div>
