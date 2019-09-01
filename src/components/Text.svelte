<script>
    export let value = '';
    export let placeholder = ''
    export let label = ''
</script>

<div class="field">
    <label class="label" >{label}</label>
    <div class="control has-icons-left">
        <input
            bind:value
            class="input"
            type="text"
            placeholder="Text input">
    </div>
</div>
