<script>
    export let input = '';
    export let placeholder = ''
    export let text = ''
    export let value = false;
</script>

<div class="field">
    <div class="control">
        <input class=input type=text {placeholder} bind:value={text}>
        <label class=checkbox>
            <input type=checkbox bind:checked={value}>
            Correct?
        </label>
    </div>
</div>
