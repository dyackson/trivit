<script>
    export let value;
    export let text;
    export let on_click;
    // regardless of whether the user answered correctly
    export let correct;
    export let reveal_correctness = false;

    $: user_answered_correctly = value === correct;

    $: icon = value ? 'check' : '';

    let color;
    $: {
        if (reveal_correctness) {
            if (correct) {
                color = 'is-success';
            } else {
                color = 'is-danger'
            }
        } else {
            color = '';
        }
    }
</script>

<div on:click={on_click} class="button {color} is-fullwidth">
    <span class="icon is-small">
        <i class='material-icons'>{icon}</i>
    </span>
    <span class='is-fullwidth'>{text}</span>
    <span class="icon is-small">
        <i class='material-icons'>{icon}</i>
    </span>
</div>
