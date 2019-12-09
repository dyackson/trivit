<script>
	import Nav from '../components/Nav.svelte';
    import {polyfill} from 'mobile-drag-drop';
    import {onMount} from 'svelte';
    // optional import of scroll behaviour
    import {scrollBehaviourDragImageTranslateOverride}
        from "mobile-drag-drop/scroll-behaviour";
    // options are optional ;)

    onMount(() => {
        polyfill({
            // use this to make use of the scroll behaviour
            dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride
        })
        // for ios safari 10.x
        window.addEventListener( 'touchmove', function() {});
    });

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

    :global(.radio-input-label) {
        margin: 0 .5em 0 .5em;
        padding: .4em .5em .4em 0;
        border-radius: .5em;
    }
</style>

<Nav {segment}/>

<slot></slot>
