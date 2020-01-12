<script context=module>
    import shuffle from '@/shuffle';
</script>

<script>
    import DragDropList from '@/components/play/DragDropList';
    export let answer;

    let items = shuffle(answer);
    let sorted_answer = answer.sort((a, b) => {
        if (a.value > b.value) return 1
        if (a.value < b.value) return -1
        return 0
    })
    let dd_list;
    let show_answer = false;

    async function put_list_in_correct_order() {
        for (let i = 0; i < sorted_answer.length; i++) {
            await dd_list.put_item_at_index(answer[i].text, i);
        }
        show_answer = true;
    }

    function reset() {
        items = shuffle(answer);
        dd_list.hide_values();
        show_answer = false;
    }
</script>

<DragDropList bind:this={dd_list} bind:items />

{#if !show_answer}
    <button class='clickable'
        on:click={put_list_in_correct_order} >
        SUBMIT
    </button>
{:else}
    <button class='clickable'
        on:click={reset} >
        RESET
    </button>
{/if}

