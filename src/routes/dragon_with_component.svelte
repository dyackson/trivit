<script>
    import DragDropList from '@/components/DragDropList';
    export let items = ['a', 'b', 'c', 'd', 'e', 'f'];
    let order = [];
</script>

<DragDropList bind:items />
{@debug items}
