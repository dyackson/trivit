<!--
    TODO:
        Make the burger larger
-->
<script>
    import {onMount} from 'svelte';
    import * as store from '@/store';
    let current = 'home';
    export {current as segment};

    onMount(async () => {
        store.import_stitch();
    });


    const routes = [
        {
            display: 'Text GET/POST',
            segment: 'home',
            href: '.',
        },
        {
            display: 'Play',
            segment: 'play',
            href: 'play',
        },
        {
            display: 'Login',
            segment: 'login_logout',
            href: 'login_logout',
        },
        {
            display: 'Create Question Old',
            segment: 'question/create_old',
            href: 'question/create_old',
        },
        {
            display: 'Create Question',
            segment: 'question/create_old',
            href: 'question/create',
        },
    ];

    let burger_open = false;

</script>

<style>
    nav {
        display: flex;
    }

    .navbar-burger {
        position: relative;
        top: 2em;
        left: 2em;
    }

    .navbar-burger span {
        background-color: seashell;
        display: block;
        width: 5em;
        height: 1em;
    }
    .navbar-burger span:nth-of-type(2) {
        margin: .5em 0;
        border-radius: .5em;
    }

    .navbar-burger span:nth-of-type(1) {
        border-top-right-radius: 1em;
        border-top-left-radius: 1em;
    }

    .navbar-burger span:nth-of-type(3) {
        border-bottom-right-radius: .5em;
        border-bottom-left-radius: .5em;
    }

</style>

<nav>
    <div
        class="navbar-burger"
        class:open={burger_open}
        on:click={() => burger_open = !burger_open}
        >
        <span></span>
        <span></span>
        <span></span>
    </div>

    <!--div
        id="nav_items"
        class="navbar-menu is-size-4"
        class:is-active={burger_open}>
        <div class="navbar-start">
            {#each routes as {href, display}}
                <a
                    class="navbar-item"
                    on:click={() => burger_open = false}
                    {href}>
                    {display}
                </a>
            {/each}
        </div>
    </div-->
</nav>
