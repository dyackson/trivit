<script>
    console.log(`I've been called`);

    export let question;
    export let answers;
    export let correctAnswer;

    let selected;

    let question = 'Which is closest to the sun?';
    let answers = [
        { id: 'a', display: 'Earth'},
        { id: 'b', display: 'The astroid belt'},
        { id: 'c', display: 'Alpha Centari'},
        { id: 'd', display: 'Veuns'},
    ]

    let correctAnswer  = 'd';
    $: correct = selected && selected === correctAnswer;
    $: incorrect = selected && selected !== correctAnswer;
</script>

<p>{question}</p>

{#each answers as {id, display}}
<div>
<label>
    <input type=radio bind:group={selected} value={id}/>
    {display}
</label>
</div>
{/each}

<button >Submit</button>

{#if correct}
    <div>Correct!</div>
{:else if incorrect}
    <div>Please try again</div>
{/if}
