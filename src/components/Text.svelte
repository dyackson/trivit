<script>
    import { AirplayIcon } from 'svelte-feather-icons'
    export let value = '';
    export let placeholder = ''
    export let label = ''
</script>

<style>
    #icon-holder {
        width: 1.5em;
        left: .5em;
        top: .25em;
    }
</style>

<div class="field">
    <label class="label" >{label}</label>
    <div class="control has-icons-left">
        <input
            bind:value
            class="input"
            type="text"
            placeholder="Text input">
        <span id='icon-holder' class="icon is-small is-left">
            <span>
            <AirplayIcon />
            <span>
        </span>
    </div>
</div>
