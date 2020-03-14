<script>
    export let value = '';
    export let label;
    export let placeholder = 'How many marbles would it take to ...';
</script>

<style>
    .field {
        margin: 1em 0;
    }
</style>

<div class="field">
    <label>{label}</label>
    <div class=text-holder>
        <textarea
            class=textarea-input
            {placeholder}
            bind:value
            ></textarea>
    </div>
</div>
