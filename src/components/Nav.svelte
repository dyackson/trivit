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

    const home = {
        display: 'TriviT',
        segment: 'home',
        href: '.',
    };

    const routes = [
        {
            display: 'Trivia',
            segment: 'trivia',
            href: 'trivia',
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

<nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item is-size-1" href={home.href} >
            {home.display}
        </a>

        <span
            role="button"
            class="navbar-burger"
            class:is-active={burger_open}
            on:click={() => burger_open = !burger_open}
            aria-label="menu"
            aria-expanded="false"
            data-target="nav_items">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </span>
    </div>

    <div
        id="nav_items"
        class="navbar-menu is-size-4"
        class:is-active={burger_open}>
        <div class="navbar-start">
            {#each routes as {segment, href, display}}
                <a
                    class="navbar-item"
                    on:click={() => burger_open = false}
                    {href}>
                    {display}
                </a>
            {/each}
        </div>
    </div>
</nav>
