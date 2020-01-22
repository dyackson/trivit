<script context=module>
</script>

<script>
    import {onMount} from 'svelte';
    import {polyfill} from 'mobile-drag-drop';

    // optional import of scroll behaviour
    import {scrollBehaviourDragImageTranslateOverride}
        from 'mobile-drag-drop/scroll-behaviour';

    // options are optional ;)
    onMount(() => {
        polyfill({ // use this to make use of the scroll behaviour
            dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride,
            dragImageCenterOnTouch: true,
            forceApply: true,
        });
    });

    export let items;

    let is_shown_by_text = {};

    let potential_drop_index = null;
    let dragged_item_index = null;
    let dragged_item = null;
    let expanded_target_height;
    let non_smooth_resizing_index = null;
    let flash_item_index = null;

    const FAKE_ITEM = {};

    const spaces_between_items = [];

    export function get_item_height(item) {
        const element = document.getElementById(item.text);
        return window.getComputedStyle(element)
            .getPropertyValue('height');
    }

    export async function move_item_to_expanded_index(item) {
        dragged_item = item;
        dragged_item_index = get_index_with_text(item.text);
        non_smooth_resizing_index = potential_drop_index + 1;
        items = [
            ...items.slice(0, dragged_item_index),
            ...items.slice(dragged_item_index + 1),
        ];
        await timeout();
        if (dragged_item_index > -1) {
            put_dragged_element_at(potential_drop_index);
        }
        await timeout(.1);
        non_smooth_resizing_index = null;
    }

    export async function expand_index(index, item_height) {
        potential_drop_index = index;

        const space_between_items_height = window
            .getComputedStyle(spaces_between_items[0])
            .getPropertyValue('height');

        expanded_target_height = (Number.parseFloat(item_height) +
            2*Number.parseFloat(space_between_items_height)) + 'px';

        await timeout(.6);
    }

    export async function flash_item_by_text(item_text) {
        flash_item_index = get_index_with_text(item_text);
        is_shown_by_text[item_text] = true;
        await timeout(.6);
        flash_item_index = null;
    }

    export async function put_item_at_index(item_text, index) {
        const current_index = get_index_with_text(item_text);
        const item = get_item_with_text(item_text);
        if (index !== current_index) {
            const height = get_item_height(item);

            const flash_p = flash_item_by_text(item_text);
            const expand_p = expand_index(index, height);
            await Promise.all([flash_p, expand_p]);

            await move_item_to_expanded_index(item);
            await flash_item_by_text(item_text);
            await timeout(.1);
        } else {
            await flash_item_by_text(item_text);
        }
    }

    export function hide_values() {
        is_shown_by_text = {}
    }

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
        event.dataTransfer.setData('move', 'my data');
        console.log('on_drag_start');
        dragged_item_index = index;
        dragged_item = items[dragged_item_index];

        const dragged_element = event.target;
        // adding the listener to the element via html doesn't work because the
        // element is not in the dom when we end the drag. Adding it here works.
        dragged_element.addEventListener('dragend', on_drag_end);
        event.dataTransfer.setDragImage(dragged_element,
            dragged_element.offsetWidth/2,
            dragged_element.offsetHeight/2);

        const dragged_element_height = window.getComputedStyle(dragged_element)
            .getPropertyValue('height');

        const space_between_items_height = window
            .getComputedStyle(spaces_between_items[0])
            .getPropertyValue('height');

        expanded_target_height = (Number.parseFloat(dragged_element_height) +
            2*Number.parseFloat(space_between_items_height)) + 'px';

        await timeout();

        // Do this in setTimeout to ensure that the image of the dragged
        // element gets copied before the element gets erased.
        potential_drop_index = dragged_item_index;
        non_smooth_resizing_index = dragged_item_index;
        items = [
            ...items.slice(0, dragged_item_index),
            ...items.slice(dragged_item_index + 1),
        ];

        await timeout();
        // remove the expanded class after a lil bit
        non_smooth_resizing_index = null;

    }

    async function on_drag_end() {
        console.log('on_drag_end');
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
        console.log('dragged over', index);
        potential_drop_index = index;
    }

    // dragenter required on mobile, per
    // github.com/timruffles/mobile-drag-drop#polyfill-requires-dragenter-listener
    // dragover required too
    function do_nothing() {}

    function on_drag_leave_site(index) {
        potential_drop_index = dragged_item_index;
    }

    async function timeout(seconds = 0) {
        return new Promise((resolve) => {
            setTimeout(resolve, seconds * 1000);
        });
    }

    function get_index_with_text(text) {
        const item = get_item_with_text(text);
        return items.indexOf(item);
    }

    function get_item_with_text(text) {
        return items.find(item => item.text === text);
    }

</script>

<style>
    :global('html body') {
        margin: 0;
        height: 100%;
        overflow: hidden;
    }
    .wrapper {
        margin: 0 .5em;
    }

    .item-holder {
        width: fit-content;
        border: 2px solid var(--light);
        border-radius: 2px;
        padding: 0 1em;
    }

    .space-between-item {
        width: 100%;
    }

    .space-between-item.contracted {
        height: 1em;
    }

    .space-between-item.smooth {
        transition: height 0.5s var(--ttf);
    }

    @keyframes flash {
        from {
            color: var(--dark);
            background-color: var(--light);
        }
        to {
            color: var(--light);
            background-color: var(--dark);
        }
    }
    .item-holder.flash {
        animation-name: flash;
        animation-duration: 0.5s;
        animation-iteration-count: 1;
        animation-timing-function: var(--ttf);
    }

</style>

{#each [...items, FAKE_ITEM]  as item, index (item.text)}
<div class=wrapper>
    <div bind:this={spaces_between_items[index]}
        id={`drop_target_${index}`}
        class=space-between-item
        class:contracted={index !== potential_drop_index}
        class:smooth={index !== non_smooth_resizing_index}
        on:dragleave|preventDefault={() => on_drag_leave_site(index)}
        on:dragover|preventDefault={() => on_drag_over(index)}
        on:dragenter|preventDefault={do_nothing}
        >
    </div>
    {#if item !== FAKE_ITEM}
    <div
        id={item.text}
        class=item-holder
        class:flash={index === flash_item_index}
        draggable=true
        on:dragstart={(event) => on_drag_start(event, index)}
        >
        {item.text}
        {#if is_shown_by_text[item.text]}
            ({item.value})
        {/if}
    </div>
    {/if}
</div>
{/each}
