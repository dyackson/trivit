<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
	:global(body) {
        color: seashell;
		background-color: black;
        font-family: "Avenir Next", "Avenir", sans-serif;
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
</style>

<Nav {segment}/>

<slot></slot>
