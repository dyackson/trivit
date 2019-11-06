<script>
    const items = ['fi', 'fai', 'fo', 'fum'];
    let potentialDropIndex = null;
    let draggedItemIndex = null;

    function onDragStart(index) {
        console.log('onDragStart', index);
        draggedItemIndex = index;
        // event.dataTransfer.setData("text/plain", event.target.innerText);
        event.dataTransfer.dropEffect = 'move';
    }

    function onDragEnd() {
        draggedItemIndex = null;
        potentialDropIndex = null;
    }

    function onDragOver(event) {
        // the taget must have ondragover to be targetble
    }

    function onDrop(event) {
        const data = event.dataTransfer.getData('text/plain');
        event.target.textContent = data;
    }

    function setPotentialDragIndex(index) {
        potentialDropIndex = index;
    }
    // dragenter required on mobile, per
    // github.com/timruffles/mobile-drag-drop#polyfill-requires-dragenter-listener
    function obligatoryHandler() {}

    function onDragOverSite(index) {
        console.log('dragged over', index);
        potentialDropIndex = index;
    }

    function onDragEnterSite(index) {
        console.log('drag entered', index);
        potentialDropIndex = index;
    }

    function onDragLeaveSite(index) {
        console.log('drag left', index);
        potentialDropIndex = null;
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
    .dragged-over {
        width: 6em;
        height: 2em;
        transition: height 0.5s var(--ttf);
    }
</style>

<!--
<div id='dragon' draggable=true on:dragstart={onDragStart}>Dragon</div>
<br>
<div id='target'
    on:dragenter|preventDefault={obligatoryHandler}
    on:dragover|preventDefault={onDragOver}
    on:drop|preventDefault={onDrop}
    >
    Target
</div>
-->

{#each [...items, 'fake']  as item, index (item)}
<div class=wrapper class:first={index === 0}>
    <div
        class=space-between-item
        class:dragged-over={index === potentialDropIndex}
        on:dragenter|preventDefault={() => onDragEnterSite(index)}
        on:dragover|preventDefault={() => true || onDragOverSite(index)}
        on:dragleave|preventDefault={() => onDragLeaveSite(index)}
        >
    </div>
    {#if item !== 'fake'}
    <div
        class=item
        draggable=true
        on:dragstart={() => onDragStart(index)}
        on:dragend|preventDefault={onDragEnd}
        >
        item
    </div>
    {/if}
</div>
{/each}
