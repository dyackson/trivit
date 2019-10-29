<script>
    const items = ['fi', 'fai', 'fo', 'fum'];
    let potentialDropIndex = null;
    function onDragStart(event) {
        console.log('onDragStart');
        event.dataTransfer.setData("text/plain", event.target.innerText);
        event.dataTransfer.dropEffect = 'move';
    }

    function onDragOver(event) {
        // the taget must have ondragover to be targetble
    }

    function onDrop(event) {
        const data = event.dataTransfer.getData('text/plain');
        event.target.textContent = data;
    }
</script>

<style>
    div {
        width: fit-content;
        border: 2px solid white;
        margin: .5em;
    }

    #target {
        padding: 4em;
    }

    .drop-site {
        width: 3em;
    }
    .dragged-over {
        width: 6em;
    }
</style>

<div id='dragon' draggable=true on:dragstart={onDragStart}>Dragon</div>
<br>
<div id='target'
    on:dragover|preventDefault={onDragOver}
    on:drop|preventDefault={onDrop}
    >
    Target
</div>

{#each items as item, index (item)}
    <div draggable=true>item</div>
    {#if index !== items.length - 1}
    <div
        class=drop-site
        class:dragged-over={index === potentialDropIndex}
        on:dragenter|preventDefault={() => potentialDropIndex = index}
        on:dragexit|preventDefault={() => potentialDropIndex = null}
        ></div>
    {/if}
{/each}
