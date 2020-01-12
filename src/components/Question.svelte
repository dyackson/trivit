<script>
    export let prompt;
    export let answers;
    export let correct_answer;
    export let done = () => null;

    console.log({prompt, done});

    let selected;
    let submitted = false;

    $: correct = selected === correct_answer;
    $: user_submitted_correct_answer = submitted && correct;
    $: user_submitted_wrong_answer = submitted && !correct;


    function submit_answer() {
        submitted = true;
    }

    function reset() {
        selected = undefined;
        submitted = false;
    }

    function prepare_for_new_data() {
        reset();
        done();
    }

</script>

<p>{prompt}</p>

{#each answers as {id, display}}
<div>
<label>
    <input type=radio bind:group={selected}
        disabled={submitted}
        value={id}
    />
    {display}
</label>
</div>
{/each}

{#if selected && !submitted}
<button on:click={submit_answer}>Submit</button>
{:else if user_submitted_wrong_answer}
<button on:click={reset}>Try again</button>
{:else if user_submitted_correct_answer}
<button on:click={prepare_for_new_data}>Ask me another</button>
{/if}

{#if user_submitted_correct_answer}
    <div>Correct!</div>
{:else if user_submitted_wrong_answer}
    <div>Incorrect</div>
{/if}
