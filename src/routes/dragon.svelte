<script>
    import {tick, onMount} from 'svelte';
    let items = ['0', '1', '2', '3', '4', '5'];

    let potential_drop_index = null;
    let dragged_item_index = null;
    let dragged_item = null;
    let non_smooth_resizing_index = null;

    const FAKE_ITEM = {};

    async function on_drag_start(event, index) {
        dragged_item_index = index;
        dragged_item = items[dragged_item_index];

        const dragged_element = event.target;
        // adding the listener to the element via html doesn't work because the
        // element is not in the dom when we end the drag. Adding it here works.
        dragged_element.addEventListener('dragend', on_drag_end);
        event.dataTransfer.setDragImage(dragged_element,
            dragged_element.offsetWidth/2,
            dragged_element.offsetHeight/2);


        await timeout();

        // Do this in setTimeout to ensure that the image of the dragged
        // element gets copied before the element gets erased.
        potential_drop_index = dragged_item_index;
        non_smooth_resizing_index = dragged_item_index;
        console.log('non_smooth_resizing_index', non_smooth_resizing_index);
        items = [
            ...items.slice(0, dragged_item_index),
            ...items.slice(dragged_item_index + 1),
        ];

        await timeout();
        // remove the expanded class after a lil bit
        non_smooth_resizing_index = null;
        console.log('non_smooth_resizing_index', non_smooth_resizing_index);

    }

    async function on_drag_end() {
        non_smooth_resizing_index = potential_drop_index + 1;
        await timeout();
        put_dragged_element_at(potential_drop_index);
    }

    function put_dragged_element_at(index) {
        items = [
            ...items.slice(0, index),
            dragged_item,
            ...items.slice(index),
        ];

        dragged_item_index = null;
        dragged_item = null,
        potential_drop_index = null;
    }

    function on_drag_over(index) {
        // console.log('on_drag_over', index);
        potential_drop_index = index;
    }

    // dragenter required on mobile, per
    // github.com/timruffles/mobile-drag-drop#polyfill-requires-dragenter-listener
    // dragover required to
    function do_nothing() {}

    function on_drag_leave_site(index) {
        potential_drop_index = dragged_item_index;
    }

    async function timeout() {
        return new Promise((resolve) => {
            setTimeout(resolve);
        });
    }

</script>

<style title='foo'>
    .wrapper {
        margin: 0 .5em;
    }

    .item {
        width: fit-content;
        border: 2px solid white;
        padding: 0 1em;
    }

    .space-between-item {
        width: 3em;
        height: .5em;
    }

    .space-between-item.expanded {
        width: 3em;
        height: 2em;
    }

    .space-between-item.smooth {
        transition: height 0.5s var(--ttf);
    }

</style>

{#each [...items, FAKE_ITEM]  as item, index (item)}
<div class=wrapper>
    <div
        id={`drop_target_${index}`}
        class=space-between-item
        class:expanded={index === potential_drop_index}
        class:smooth={index !== non_smooth_resizing_index}
        on:dragleave|preventDefault={() => on_drag_leave_site(index)}
        on:dragover|preventDefault={() => on_drag_over(index)}
        >
    </div>
    {#if item !== FAKE_ITEM}
    <div
        class=item
        draggable=true
        on:dragstart={(event) => on_drag_start(event, index)}
        >
        {item}
    </div>
    {/if}
</div>
{/each}
