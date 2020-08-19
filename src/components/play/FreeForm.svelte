<script context=module>
</script>

<script>
    export let answer;
    export let show_answer = false;
    $: button_text = show_answer ? 'Hide Answer' : 'Show Answer'
</script>


<div class='content'>
    {#if show_answer}
        <p>
            {answer}
        </p>
    {/if}
    <button class='button' on:click={() => show_answer = !show_answer} >
        {button_text}
    </button>
</div>
