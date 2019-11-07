<script>
    const items = ['fi', 'fai', 'fo', 'fum'];
    let potential_drop_index = null;
    let dragged_item_index = null;

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

    function on_drag_start(index) {
        console.log('on_drag_start', index);
        dragged_item_index = index;
        // event.dataTransfer.setData("text/plain", event.target.innerText);
        event.dataTransfer.dropEffect = 'move';
    }

    function on_drag_end() {
        dragged_item_index = null;
        potential_drop_index = null;
    }

    function onDragOver(event) {
        // the taget must have ondragover to be targetble
    }

    function onDrop(event) {
        const data = event.dataTransfer.getData('text/plain');
        event.target.textContent = data;
    }

    function setPotentialDragIndex(index) {
        potential_drop_index = index;
    }
    // dragenter required on mobile, per
    // github.com/timruffles/mobile-drag-drop#polyfill-requires-dragenter-listener
    function obligatoryHandler() {}

    function onDragOverSite(index) {
        console.log('dragged over', index);
        potential_drop_index = index;
    }

    function on_drag_enter_site(index) {
        console.log('drag entered', index);
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

    .wrapper.first {
        margin-top: 1em;
    }

    .item {
        width: fit-content;
        border: 2px solid white;
    }

    .space-between-item {
        border: 2px solid white;
        width: 3em;
        height: .5em;
        transition: height 0.5s var(--ttf);
    }
    .expanded {
        width: 6em;
        height: 2em;
        transition: height 0.5s var(--ttf);
    }
</style>

<!--
<div id='dragon' draggable=true on:dragstart={on_drag_start}>Dragon</div>
<br>
<div id='target'
    on:dragenter|preventDefault={obligatoryHandler}
    on:dragover|preventDefault={onDragOver}
    on:drop|preventDefault={onDrop}
    >
    Target
</div>
-->

{#each [...items, Symbol.for('fake')]  as item, index (item)}
<div class=wrapper class:first={index === 0}>
    <div
        class=space-between-item
        class:expanded={index === expanded_index}
        on:dragenter|preventDefault={() => on_drag_enter_site(index)}
        on:dragleave|preventDefault={() => on_drag_leave_site(index)}
        >
    </div>
    {#if item !== Symbol.for('fake')}
    <div
        class=item
        draggable=true
        on:dragstart={() => on_drag_start(index)}
        on:dragend|preventDefault={on_drag_end}
        >
        item
    </div>
    {/if}
</div>
{/each}
