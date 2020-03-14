<script>
    export let value = '';
    export let label = '';
    export let yes = 'True'
    export let no = 'False'


</script>

<style>
    lable.optional {
        margin: 0 0 .5em 0;
    }
</style>

{#if label}
    <label class=optional>{label}</label>
{/if}

<div>
<label class=radio-input-label class:selected={value}>
    <input type="radio" value={true} bind:group={value}>
    True
</label>
<label class=radio-input-label class:selected={value === false}>
    <input type="radio" value={false} bind:group={value}>
    False
</label>
</div>
