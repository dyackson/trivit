<script context=module>
</script>

<script>
    import Prompt from '@/components/Prompt';
    export let prompt;
    export let answer;
    export let show_answer = false;
</script>

<Prompt text={prompt} />

<div class='content is-large'>
{#if show_answer}
    <label is-medium>Answer:</label>
    <p>
        {answer}
    </p>
    <button class='button' on:click={() => show_answer = false} >
        Hide Answer
    </button>
{:else}
    <button class='button' on:click={() => show_answer = true} >
        Show Answer
    </button>
{/if}
</div>



