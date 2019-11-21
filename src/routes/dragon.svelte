<script>
    import {tick, onMount} from 'svelte';
    let items = ['0', '1', '2', '3', '4', '5'];

    let potential_drop_index = null;
    let dragged_item_index = null;
    let dragged_item = null;

    const FAKE_ITEM = {};

    onMount(() => {
    });

    function on_drag_start(event, index) {
        event.dataTransfer.setData('text/plain', 'some_dummy_data');
        console.log('on_drag_start', event, index);
        dragged_item_index = index;
        dragged_item = items[dragged_item_index];
        console.log('dragged_item_index', dragged_item_index);


        const dragged_element = event.target;
        // adding the listener to the element via html doesn't work because the
        // element is not in the dom when we end the drag. Adding it here works.
        dragged_element.addEventListener('dragend', on_drag_end);
        console.log('dragged_item', dragged_element);
        event.dataTransfer.setDragImage(dragged_element,
            dragged_element.offsetWidth/2,
            dragged_element.offsetHeight/2);


        setTimeout(() => {
            // Do this in setTimeout to ensure that the image of the dragged
            // element gets copied before the element gets erased.

            potential_drop_index = dragged_item_index;
            items = [
                ...items.slice(0, dragged_item_index),
                ...items.slice(dragged_item_index + 1),
            ];
        });
    }

    function on_drag_end() {
        console.log('on_drag_end, potential_drop_index', potential_drop_index);
        let drop_index;
        if (potential_drop_index !== null) {
            drop_index = potential_drop_index;
        } else {
            // It is not over a target--put it back where it came from.
            potential_drop_index = dragged_item_index;
        }
        put_dragged_element_at(drop_index);
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

    function on_drag_over(event) {
        // the taget must have ondragover to be targetble
    }

    // dragenter required on mobile, per
    // github.com/timruffles/mobile-drag-drop#polyfill-requires-dragenter-listener
    // dragover required to
    function do_nothing() {}

    function on_drag_enter_site(event, index) {
        const target = event.target;
        console.log('drag entered', index, target);
        potential_drop_index = index;
    }

    function on_drag_leave_site(index) {
        console.log('drag left', index);
        potential_drop_index = null;
    }
</script>

<style>
    .wrapper {
        margin: 0 .5em;
    }

    .dragged {
        /*
        margin: 0;
        height: 0;
            */
    }

    .item {
        width: fit-content;
        border: 2px solid white;
        padding: 0 1em;
    }

    .space-between-item {
     /*   border: 2px solid white; */
        width: 3em;
        height: .5em;
        /* transition: height 0.5s var(--ttf); */
    }
    .space-between-item.expanded {
        width: 6em;
        height: 2em;
        /* transition: height 0.5s var(--ttf); */
    }

    #drag_image {
        color: white;
    }

    .space-between-item.contracting {
        transition: none;
    }
</style>

{#each [...items, FAKE_ITEM]  as item, index (item)}
<div class=wrapper class:dragged={index === dragged_item_index}>
    <div
        class=space-between-item
        class:expanded={index === potential_drop_index}
        on:dragenter|preventDefault={(event) => on_drag_enter_site(event, index)}
        on:dragleave|preventDefault={() => on_drag_leave_site(index)}
        on:dragover|preventDefault={do_nothing}
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
