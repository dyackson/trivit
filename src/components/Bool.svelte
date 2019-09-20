<script>
    export let value = true;
    export let label = '';
</script>

<div class="field">
    {#if label}
        <label class="label">{label}</label>
    {/if}
    <div class="control">
        <label class="radio">
            <input type="radio" name="answer" value={true} bind:group={value}>
            True
        </label>
        <label class="radio">
            <input type="radio" name="answer" value={false} bind:group={value}>
            False
        </label>
    </div>
</div>
