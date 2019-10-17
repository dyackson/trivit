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

    global:(.clickable) {
        cursor: pointer;
    }
</style>

<Nav {segment}/>

<slot></slot>
