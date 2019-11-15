<script>
    import {tick} from 'svelte';
    let items = ['0', '1', '2', '3', '4', '5'];
    let potential_drop_index = null;
    let dragged_item_index = null;
    let drag_image;

    const FAKE = {};

    $: expanded_index = (() => {
        if (potential_drop_index === null) {
            return;
        }
        const potential_drop_is_adjacent
            = potential_drop_index === dragged_item_index
            || potential_drop_index === dragged_item_index + 1;

        if (!potential_drop_is_adjacent) {
            return potential_drop_index;
        }
    })();

    const item_div_refs = [];

    let dragged_div = null;
    if (dragged_item_index !== null) {
        dragged_div = item_div_refs[dragged_item_index];
    } else {
        dragged_div = null;
    }

    function on_drag_start(event, index) {
        console.log('on_drag_start', event, index);
        dragged_item_index = index;
        console.log('dragged_item_index', dragged_item_index);

        const dragged_item = item_div_refs[dragged_item_index];
        dragged_item.innerText = 'farts';
        console.log('dragged_item', dragged_item);
        event.dataTransfer.setDragImage(dragged_item, 0, 0);
        setTimeout(() => {
            items = [
                ...items.slice(0, dragged_item_index),
                ...items.slice(dragged_item_index + 1),
            ];
        });
    }

    function on_drag_end() {
        console.log('on_drag_end');
        if (potential_drop_index !== null) {
            const dragged_item = items[dragged_item_index];
            if (dragged_item_index < potential_drop_index) {
                // move down the list
                items = [
                    ...items.slice(0, dragged_item_index),
                    ...items.slice(dragged_item_index +1, potential_drop_index),
                    dragged_item,
                    ...items.slice(potential_drop_index),
                ];
            } else {
                // move up the list
                items = [
                    ...items.slice(0, potential_drop_index),
                    dragged_item,
                    ...items.slice(potential_drop_index, dragged_item_index),
                    ...items.slice(dragged_item_index + 1),
                ];
            }
        }
        dragged_item_index = null;
        potential_drop_index = null;
    }

    function on_drag_over(event) {
        // the taget must have ondragover to be targetble
    }

    function on_drop(event) {
        const data = event.dataTransfer.getData('text/plain');
        event.target.textContent = data;
    }

    // dragenter required on mobile, per
    // github.com/timruffles/mobile-drag-drop#polyfill-requires-dragenter-listener
    function obligatoryHandler() {}

    function on_drag_enter_site(index) {
        console.log('drag entered', index);
        potential_drop_index = index;
    }

    function on_drag_leave_site(index) {
        console.log('drag left', index);
        // potential_drop_index = null;
    }

    function on_drag_enter_self() {}
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
        transition: height 0.5s var(--ttf);
    }
    .space-between-item.expanded {
        width: 6em;
        height: 2em;
        transition: height 0.5s var(--ttf);
    }

    #drag_image {
        color: white;
    }

    .space-between-item.contracting {
        transition: none;
    }
</style>

<!--
<div id='dragon' draggable=true on:dragstart={on_drag_start}>Dragon</div>
<br>
<div id='target'
    on:dragenter|preventDefault={obligatoryHandler}
    on:dragover|preventDefault={on_drag_over}
    on:drop|preventDefault={on_drop}
    >
    Target
</div>
-->

{#each [...items, FAKE]  as item, index (item)}
<div class=wrapper class:dragged={index === dragged_item_index}>
    <div
        class=space-between-item
        class:expanded={index === expanded_index}
        on:dragenter|preventDefault={() => on_drag_enter_site(index)}
        on:dragleave|preventDefault={() => on_drag_leave_site(index)}
        >
    </div>
    {#if item !== FAKE}
    <div
        class=item
        draggable=true
        on:dragstart={(event) => on_drag_start(event, index)}
        on:dragend|preventDefault={on_drag_end}
        on:dragenter|preventDefault={() => on_drag_enter_self(index)}
        bind:this={item_div_refs[index]}
        >
        {item}
    </div>
    {/if}
</div>
{/each}
<div id=drag_image bind:this={drag_image}>farts</div>
