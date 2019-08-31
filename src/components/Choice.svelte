<script>
    import {CircleIcon, CheckCircleIcon} from 'svelte-feather-icons'

    export let input = '';
    export let placeholder = ''
    export let text = ''
    export let value = false;

    $: leftIcon = value ? CheckCircleIcon : CircleIcon;
</script>

<style>
    #icon-holder {
        width: 1.5em;
        left: .5em;
    }
</style>

<div class="field">
    <div class="control has-icons-left has-icons-right">
        <input class=input type=text {placeholder} bind:value={text}>
        <span id='icon-holder'
            class="icon is-small is-left"
            on:click={() => value = !value}
            >
            <svelte:component this={leftIcon} />
        </span>
        <button
            on:click={() => value = !value}
            >button</button>
    </div>
</div>
