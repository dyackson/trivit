<script>
    export let value = true;
    export let label = '';
</script>

<style>
    .holder {
        padding: .5em;
    }

    .input {
        margin: 0 .5em 0 .5em;
    }
</style>
<div class=holder>
    {#if label}
        <label>{label}</label>
    {/if}
    <div>
        <label class=input>
            <input type="radio" name="answer" value={true} bind:group={value}>
            True
        </label>
        <label class=input>
            <input type="radio" name="answer" value={false} bind:group={value}>
            False
        </label>
    </div>
</div>
