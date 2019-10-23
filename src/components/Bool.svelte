<script>
    export let value = '';
    export let label = '';


</script>

<style>
</style>
{#if label}
    <label>{label}</label>
{/if}

<label class=radio-input-label class:selected={value}>
    <input type="radio" value={true} bind:group={value}>
    True
</label>
<label class=radio-input-label class:selected={value === false}>
    <input type="radio" value={false} bind:group={value}>
    False
</label>
