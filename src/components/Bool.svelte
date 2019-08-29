<script>
    export let value = true;
    export let label = true;
</script>

<div class="field">
    <label class="label">{label}</label>
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
