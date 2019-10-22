<script context=module>
    import {TYPE_CONFIGS} from '@/meta';
    const config = TYPE_CONFIGS.mc_single;
</script>

<script>
    import Prompt from '@/components/Prompt';
    import Bool from '@/components/Bool';
    export let prompt;
    export let answer;
    export let show_answer = false;

    let correct_ans = answer.find((ans) => ans.value);

    let selected_ans_key = ''

    let response = '';

    function on_toggle(key) {
        guess = config.on_toggle(answer, key);
    }

    function submit() {
        if (selected_ans_key === correct_ans.key) {
            response = 'Correct';
        } else {
            response = 'Wrong';
        }

        show_answer = true;
    }

    function reset() {
        response = '';
        show_answer = false;
    }
</script>


<style>
    .label {
        display: block;
        padding: .5em 0;
        width: fit-content;
    }
</style>

<Prompt text={prompt} />

<div>
    {#each answer as ans (ans.key)}
        <label for={ans.key}
            class="clickable label"
            class:selected={ans.key ===  selected_ans_key}>
            <input
                id={ans.key}
                type=radio
                value={ans.key}
                bind:group={selected_ans_key}/>
            {ans.text}
        </label>
    {/each}
    <br>
    <button class='button is-fullwidth' on:click={submit} >
        Submit
    </button>
</div>
