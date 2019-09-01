<script>
    export let input = '';
    export let placeholder = ''
    export let text = ''
    export let value = true;
    $: left_icon = value ? 'thumb_up_alt' : 'thumb_down_alt';

</script>

<div class="field has-addons">
    <div class=control on:click={() => value = !value}>
        <div class="button">
            <span class="icon is-small">
                <i class='material-icons'>{left_icon}</i>
            </span>
        </div>
    </div>
    <div class="control">
        <input class='input' type=text {placeholder} bind:value={text}>
    </div>
</div>
