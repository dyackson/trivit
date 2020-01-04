<script>
    import shuffle from '@/shuffle';
    import DragDropList from '@/components/DragDropList';
    export let answer = [
        {value: 1, text: 'a'},
        {value: 2, text: 'b'},
        {value: 3, text: 'c'},
        {value: 4, text: 'd'},
        {value: 5, text: 'e'},
        {value: 6, text: 'f'},
    ];
    let items = shuffle(answer);
    let dd_list;

    function get_item_height() {
        item_height = dd_list.get_item_height('c');
        console.log(item_height)
    }

    function expand_index() {
        dd_list.expand_index(0, item_height);
    }

    async function put_list_in_correct_order() {
        for (let i = 0; i < answer.length; i++) {
            console.log('loop', i);
            await dd_list.put_item_at_index(answer[i].text, i);
        }
    }

</script>

<DragDropList bind:this={dd_list} bind:items />
<button on:click={get_item_height}> get item height </button>
<button on:click={expand_index}> expand index </button>
<button on:click={() => dd_list.move_item_to_expanded_index('c')}>
    move item to expaneded index </button>
<button on:click={() => dd_list.put_item_at_index('c', 0)}>
    move 'c' to index 0 </button>
<button on:click={() => dd_list.put_item_at_index('b', 1)}>
    move 'a' to index 4 </button>
<button on:click={put_list_in_correct_order}>
    put list in correct order
</button>
<button on:click={() => dd_list.flash_item_by_text('e')}>
    flash e
</button>
