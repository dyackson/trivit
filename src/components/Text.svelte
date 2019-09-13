<script>
    export let value = '';
    export let placeholder = 'Kevin Bacon'
    export let label = ''
</script>

<div class="field">
    {#if label}
    <label class="label">{label}</label>
    {/if}
    <div class="control">
        <input
            bind:value
            class="input"
            type="text"
            {placeholder}>
    </div>
</div>
