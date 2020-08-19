<script>
	import Nav from '../components/Nav.svelte';

   export let segment;
</script>

<style>
    :root {
        /* transition timing function */
        --ttf: cubic-bezier(0.77, 0.2, 0.05, 1.0);
    }
    :global(*) {
        font-weight: bold;
    }
</style>

<Nav {segment}/>

<div class=route-wrapper>
    <slot></slot>
</div>
