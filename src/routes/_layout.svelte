<script>
	import Nav from '../components/Nav.svelte';

   export let segment;
</script>

<style>
    :root {
        /* transition timing function */
        --ttf: cubic-bezier(0.77, 0.2, 0.05, 1.0);
        --light: #f8d56b;
        --dark: #071a23;
    }
    :global(*) {
        font-weight: bold;
    }


    /*
    :global(button) {
        border: 0.1em solid var(--light);
        background: transparent;
        color: var(--light);
        padding: .3em;
        margin: 1em 1.5em;
    }

    :global(body) {
        color: var(--light);
        background-color: var(--dark);
        font-family: "Avenir Next", "Avenir", sans-serif;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    :global(*, *:before, *:after) {
        box-sizing: inherit;
    }

    :global(.clickable) {
        cursor: pointer;
    }

    :global(.selected) {
        background-color: tomato;
        color: var(--dark);
    }

    :global(.text-input) {
        font-size: 1rem;
        width: 70%;
        max-width: 20em;
        background: var(--light);
        color: var(--dark);
        border-radius: 1.2em;
        padding: .4em .8em;
        border-color: var(--light);
    }

    :global(.textarea-input) {
        font-size: 1.24rem;
        width: 100%;
        max-width: 40em;
        height: 8em;
        resize: none;
        background: var(--light);
        color: var(--dark);
        border-radius: 1.2em;
        padding: .4em .8em;
        border-color: var(--light);
    }

    :global(.radio-input-label) {
        margin: 0 .5em 0 .5em;
        padding: .4em .5em .4em 0;
        border-radius: .5em;
    }

    .route-wrapper {
        padding: 4vw;
    }
    */
</style>

<Nav {segment}/>

<div class=route-wrapper>
    <slot></slot>
</div>
