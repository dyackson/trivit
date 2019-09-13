<script>
    export let placeholder = ''
    export let text = ''
    // value = is this a correct choice
    export let value = false;
    export let delete_ans = null;
    export let toggle_ans = null;
    $: left_icon = value ? 'thumb_up_alt' : 'thumb_down_alt';
    $: color = value ? 'is-success' : 'is-danger';


</script>

<div class="field has-addons">
    <div class=control on:click={toggle_ans}>
        <div class="button {color}">
            <span class="icon is-small">
                <i class='material-icons'>{left_icon}</i>
            </span>
        </div>
    </div>
    <div class="control">
        <input class='input' type=text {placeholder} bind:value={text}>
    </div>
    <div class=control on:click={delete_ans}>
        <div class="button">
            <span class="icon is-small">
                <i class='material-icons'>clear</i>
            </span>
        </div>
    </div>
</div>
