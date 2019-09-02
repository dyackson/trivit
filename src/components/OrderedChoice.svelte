<script>
    export let placeholder = ''
    export let text = ''
    // value = is this a correct choice
    export let value = '';
    export let delete_choice = null;
    export let toggle_choice = null;


</script>

<div class="field has-addons">
    <div class="control">
        <input class='input' type=text {placeholder} bind:value={text}>
    </div>
    <div class="control">
        <input class='input' type=text {placeholder} bind:value={text}>
    </div>
    <div class=control on:click={delete_choice}>
        <div class="button">
            <span class="icon is-small">
                <i class='material-icons'>clear</i>
            </span>
        </div>
    </div>
</div>
