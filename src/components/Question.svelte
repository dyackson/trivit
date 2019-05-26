<script>
    export let prompt;
    export let answers;
    export let correct_answer;
    export let done = () => null;

    console.log({prompt, done});

    let selected;
    let evaluate = false;

    $: correct = selected === correct_answer;
    $: user_submitted_correct_answer = evaluate && correct;
    $: user_submitted_wrong_answer = evaluate && !correct;


    function reset() {
        selected = undefined;
        evaluate = false;
    }
</script>
{@debug
user_submitted_wrong_answer,
user_submitted_correct_answer,
evaluate,
selected,
correct
}

<p>{prompt}</p>

{#each answers as {id, display}}
<div>
<label>
    <input type=radio bind:group={selected}
        disabled={evaluate}
        value={id}
        key={prompt + id}
    />
    {display}
</label>
</div>
{/each}

{#if selected && !evaluate}
<button on:click={() => evaluate = true}>Submit</button>
{:else if user_submitted_wrong_answer}
<button on:click={reset}>Try again</button>
{:else if user_submitted_correct_answer}
<button on:click={done}>Ask me another</button>
{/if}

{#if user_submitted_correct_answer}
    <div>Correct!</div>
{:else if user_submitted_wrong_answer}
    <div>Incorrect</div>
{/if}
