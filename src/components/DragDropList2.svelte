<script>
    export let items = ['0', '1', '2', '3', '4', '5'];

    let potential_drop_index = null;
    let dragged_item_index = null;
    let dragged_item = null;
    let expanded_target_height;
    let non_smooth_resizing_index = null;

    const FAKE_ITEM = {};

    const spaces_between_items = [];

    $: spaces_between_items
        // remove the null one at the end
        .filter(space => space)
        .forEach((space, i) => {
            if (i === potential_drop_index) {
                space.style.height = expanded_target_height;
            } else {
                space.setAttribute('style', null);
            }
        });

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

        // TODO: add the margins to the height;
        const dragged_element_height = window.getComputedStyle(dragged_element)
            .getPropertyValue('height');

        const space_between_items_height = window
            .getComputedStyle(spaces_between_items[0])
            .getPropertyValue('height');

        expanded_target_height = (Number.parseFloat(dragged_element_height) +
            2*Number.parseFloat(space_between_items_height)) + 'px';

        console.log('dragged_element_height', dragged_element_height);
        console.log('space_between_items_height', space_between_items_height);
        console.log('expanded_target_height', expanded_target_height);
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
    // dragover required too
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

<style>
    .wrapper {
        margin: 0 .5em;
    }

    .item-holder {
        width: fit-content;
        border: 2px solid white;
        padding: 0 1em;
    }

    .space-between-item {
        width: 3em;
    }

    .space-between-item.contracted {
        width: 3em;
        height: .5em;
    }

    .space-between-item.smooth {
        transition: height 0.5s var(--ttf);
    }

</style>

{#each [...items, FAKE_ITEM]  as item, index (item)}
<div class=wrapper>
    <div bind:this={spaces_between_items[index]}
        id={`drop_target_${index}`}
        class=space-between-item
        class:contracted={index !== potential_drop_index}
        class:smooth={index !== non_smooth_resizing_index}
        on:dragleave|preventDefault={() => on_drag_leave_site(index)}
        on:dragover|preventDefault={() => on_drag_over(index)}
        >
    </div>
    {#if item !== FAKE_ITEM}
    <div
        class=item-holder
        draggable=true
        on:dragstart={(event) => on_drag_start(event, index)}
        >
        {item}
    </div>
    {/if}
</div>
{/each}
