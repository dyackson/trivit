<script context=module>
    import {TYPE_CONFIGS} from '@/meta';
    const config = TYPE_CONFIGS.mc_single;
</script>

<script>
    import Bool from '@/components/Bool';
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
        console.log('called reset');
        response = '';
        show_answer = false;
    }
</script>


<style>
</style>


{#each answer as ans (ans.key)}
    <div class="control is-block">
    <label for={ans.key}
        class="radio ml-0"
        >
        <input
            id={ans.key}
            type=radio
            value={ans.key}
            bind:group={selected_ans_key}/>
        {ans.text}
    </label>
    </div>
{/each}
{#if selected_ans_key}
    {#if !show_answer}
        <button class='button'
            on:click={submit} >
            SUBMIT
        </button>
    {:else}
        <button class='button'
            on:click={reset} >
            RESET
        </button>
    {/if}
{/if}
