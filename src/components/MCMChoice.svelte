<script>
    export let value;
    export let text;
    export let on_click;

    // $: icon = value ? 'check_circle_outline' : 'radio_button_unchecked';
    $: icon = value ? 'check' : '';
    // $: icon_color = value ? 'is-primary' : 'is-grey';
    const icon_color = 'is-grey';
</script>

<div on:click={on_click} class="button {icon_color} is-fullwidth">
    <span class="icon is-small">
        <i class='material-icons'>{icon}</i>
    </span>
    <span class='is-fullwidth'>{text}</span>
    <span class="icon is-small">
        <i class='material-icons'>{icon}</i>
    </span>
</div>
