<script>
    export let value = '';
    export let label = '';


</script>

<style>
    .input-label {
        margin: 0 .5em 0 .5em;
        padding: .4em .5em .4em 0;
        border-radius: .5em;
    }

    .input-label:hover {
        cursor: pointer;
    }

    .selected {
        background-color: tomato;
        color: var(--dark);
    }
</style>
{#if label}
    <label>{label}</label>
{/if}

<label class=input-label class:selected={value}>
    <input type="radio" value={true} bind:group={value}>
    True
</label>
<label class=input-label class:selected={value === false}>
    <input type="radio" value={false} bind:group={value}>
    False
</label>
