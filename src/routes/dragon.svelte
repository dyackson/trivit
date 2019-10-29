<script>
    function onDragStart(event) {
        console.log('onDragStart');
        event.dataTransfer.setData("text/plain", ev.target.innerText);
        event.dataTransfer.dropEffect = 'move';
    }
</script>

<style>
</style>

<div id='dragon' draggable=true ondragstart={onDragStart}>Dragon</div>
