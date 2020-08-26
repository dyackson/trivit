<script>
    export let value = '';
    export let label;
    export let placeholder = 'How many marbles would it take to ...';
</script>

<style>
</style>

<div class="field">
    {#if label}
    <label class="label">{label}</label>
    {/if}
    <div class="control">
        <textarea
            class=textarea
            bind:value
            {placeholder}/>
    </div>
</div>
