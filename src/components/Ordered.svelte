<script context=module>
    import {TYPE_CONFIGS} from '@/meta';
    const config = TYPE_CONFIGS.ordered;
    import shuffle from '@/shuffle';
    import DragDropList from '@/components/DragDropList';
</script>

<script>
    import Prompt from '@/components/Prompt';
    import Bool from '@/components/Bool';
    export let prompt;
    export let answer;
    export let show_answer = false;
    let items = shuffle(answer.map(a => a.text));

    function submit() {
        show_answer = true;
    }

    function reset() {
        show_answer = false;
    }
</script>


<style>
</style>

<Prompt text={prompt} />
<DragDropList bind:items />
{#if !show_answer}
    <button class='clickable'
        on:click={submit} >
        SUBMIT
    </button>
{:else}
    <button class='clickable'
        on:click={reset} >
        RESET
    </button>
{/if}

