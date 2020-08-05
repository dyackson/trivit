<script>
    export let value = false;
    export let text;
    export let on_click;
    // regardless of whether the user answered correctly
    export let correct;
    export let reveal_correctness = false;

    $: user_answered_correctly = value === correct;

    $: icon = value ? 'check' : '';

    let color;
    $: if (reveal_correctness) {
        if (correct) {
            color = 'is-success';
        } else {
            color = 'is-danger'
        }
    } else {
        color = '';
    }

    function toggle() {
        console.log('click');
        value = !value;
    }

    let revealed_class;
    $: if (reveal_correctness)
        if (value)
            // selected
            if (correct) revealed_class = 'selected-right-answer'
            else revealed_class = 'selected-wrong-answer'
        else
            // did not select
            if (correct) revealed_class = 'omitted-right-answer'
            else revealed_class = 'omitted-wrong-answer'
    else revealed_class = '';

</script>

<style>
    .omitted-wrong-answer {
        color: transparent;
        text-shadow: 0 0 .2em green;
    }

    .selected-wrong-answer {
        color: transparent;
        text-shadow: 0 0 .2em red;
    }

    .omitted-right-answer {
        color: red;
    }

    .selected-right-answer {
        color: green;
    }
</style>

<div>
    <input type=checkbox id={text} bind:checked={value}>
    <label for={text} class={revealed_class}>{text}</label>
</div>
<!--
<div on:click={on_click} class="button {color} is-fullwidth">
    <span class="icon is-small">
        <i class='material-icons'>{icon}</i>
    </span>
    <span class='is-fullwidth'>{text}</span>
    <span class="icon is-small">
        <i class='material-icons'>{icon}</i>
    </span>
</div>
    -->
