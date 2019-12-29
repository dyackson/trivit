<script>
    import DragDropList from '@/components/DragDropList2';
    import DragDropItemWrapper from '@/components/DragDropItemWrapper';
    export let items = ['a', 'b', 'c', 'd', 'e', 'f'];
    let order = [];
</script>

<DragDropList bind:order>
    {#each items as item}
        <DragDropItemWrapper>
         {item}
        </DragDropItemWrapper>
    {/each}
</DragDropList>
