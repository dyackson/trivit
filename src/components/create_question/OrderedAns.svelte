<script>
    export let text = ''
    // value = The thing to sort by
    export let value = undefined;
    export let text_placeholder = 'Battle of Hastings'
    export let value_placeholder = 1066;

    export let delete_ans = null;


</script>

<div class="field has-addons">
    <div class="control">
        <input
            class='input'
            type=text
            placeholder={text_placeholder}
            bind:value={text}>
    </div>
    <div class="control">
        <input
            class='input'
            type=number
            placeholder={value_placeholder}
            bind:value>
    </div>
    <div class=control on:click={delete_ans}>
        <div class="button">
            <span class="icon is-small">
                <i class='material-icons'>clear</i>
            </span>
        </div>
    </div>
</div>
