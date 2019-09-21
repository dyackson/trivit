<script>
    export let placeholder = ''
    export let text = ''
    // value = is this a correct choice
    export let value = false;
    export let delete_ans = null;
    export let toggle = null;
    export let play_mode = false;

    let icon;
    let icon_color = '';

    $: {value;
        set_icon();
    }

    function set_icon() {
        if (play_mode) {
            icon = value ? 'check_circle_outline' : 'radio_button_unchecked';
            // no color in play mode
        } else {
            icon_color = value ? 'is-success' : 'is-danger';
            icon = value ? 'thumb_up_alt' : 'thumb_down_alt';
        }
    }


</script>

{#if play_mode}
<div class="field has-addons" on:click={toggle}>
    <div class=control>
        <div class="button {icon_color}">
            <span class="icon is-small">
                <i class='material-icons'>{icon}</i>
            </span>
        </div>
    </div>
    <div class="control">
        <div
            class='input'
            type=text
            {placeholder}
            readonly={play_mode}>
            {text}
        </div>
    </div>
</div>
{:else}
<div class="field has-addons">
    <div class=control on:click={toggle}>
        <div class="button {icon_color}">
            <span class="icon is-small">
                <i class='material-icons'>{icon}</i>
            </span>
        </div>
    </div>
    <div class="control">
        <input
            class='input'
            type=text
            {placeholder}
            bind:value={text}
            readonly={play_mode}>
    </div>
        <div class=control on:click={delete_ans}>
            <div class="button">
                <span class="icon is-small">
                    <i class='material-icons'>clear</i>
                </span>
            </div>
        </div>
</div>
{/if}
