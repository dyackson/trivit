<script context=module>
</script>

<script>
    import Prompt from '@/components/Prompt';
    export let prompt;
    export let answer;
    export let show_answer = false;
</script>

<Prompt text={prompt} />

{#if show_answer}
    <div class=content>
        {answer}
    </div>
{:else}
    <button class='button' on:click={() => show_answer = true} >
        Show Answer
    </button>
{/if}




