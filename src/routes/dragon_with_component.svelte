<script>
    import DragDropList from '@/components/DragDropList';
    export let items = ['a', 'b', 'c', 'd', 'e', 'f'];
    let order = [];
    let dd_list;
    let item_height;

    function get_item_height() {
        item_height = dd_list.get_item_height('c');
        console.log(item_height)
    }

    function expand_index() {
        dd_list.expand_index(0, item_height);
    }

</script>

<DragDropList bind:this={dd_list} bind:items />
<button on:click={get_item_height}> get item height </button>
<button on:click={expand_index}> expand index </button>
<button on:click={() => dd_list.move_item_to_expanded_index('c')}>
    move item to expaneded index </button>
