<script>
    export let value = '';
    export let label;
    export let placeholder = 'How many marbles would it take to ...';
</script>

<div class="field">
    <label class="label">{label}</label>
    <div class="control">
        <textarea
            class=textarea
            {placeholder}
            bind:value
            ></textarea>
    </div>
</div>
