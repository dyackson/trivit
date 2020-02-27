<script>
    export let placeholder = ''
    export let text = ''
    // value = is this a correct choice
    export let value = false;
    export let delete_ans = null;
    export let toggle = null;
    $: left_icon = value ? 'thumb_up_alt' : 'thumb_down_alt';
    $: color = value ? 'correct' : 'wrong';
</script>

<style>
    .row {
        display: flex;
        align-items: center;
        font-size: 1.2em;
        margin: .5em 0;
    }
    i {
        padding: 0 .2em;
        font-size: 2em;
    }
    input {
        font-size: inherit;
        width: 70%;
        background: var(--dark);
        color: var(--light);
        border-radius: 1.2em;
        padding: .2em;
        border-color: var(--light);
        text-align: center;
    }
    .correct {
        color: chartreuse;
    }
    .wrong {
        color: tomato;
    }

</style>

<div class=row>
    <i class='material-icons {color}'
        on:click={toggle}>{left_icon}</i>
    <input class='input' type=text {placeholder} bind:value={text}>
    <i class='material-icons' on:click={delete_ans}>clear</i>
</div>
