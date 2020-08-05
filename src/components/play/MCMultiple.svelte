<script context=module>
    import {TYPE_CONFIGS} from '@/meta';
    const config = TYPE_CONFIGS.mc_multiple;
</script>

<script>
    import MCMChoice from '@/components/play/MCMChoice';
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

    let button_text, on_click;
    $: if (show_answer) {
        button_text = 'Reset'
        on_click = reset;
    } else {
        button_text = 'Submit'
        on_click = submit;
    }
</script>

<div class='content is-large'>
    {#each guess as g (g.key)}
        <MCMChoice
            text={g.text}
            reveal_correctness={show_answer}
            on_click={() => on_toggle(g.key)}
            correct={g.correct}
            value={g.value} />
    {/each}

    <br>
    <button class='button is-fullwidth' on:click={on_click} >
        {button_text}
    </button>
</div>
