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

    let open = false;
</script>

<style>
    :root {
        /* transition timing function */
        --ttf: cubic-bezier(0.77, 0.2, 0.05, 1.0);
    }

    nav {
        font-size: calc(2vw + .5em);
    }

    #menu-button {
        position: relative;
        top: 1em;
        left: 1em;
        cursor: pointer;
        z-index: 2;
        transform: translate(-4em, 0);
        transition: transform 0.5s var(--ttf);
    }

    #menu-button.open {
        color: black;
        transform: none;
        transition: color 0.5s var(--ttf);
    }

    #menu {
        background: seashell;
        color: black;
        position: absolute;
        padding: 1em;
        padding-top: 3em;
        top: 0;
        margin: 0;

        border-color: white;
        border-width: 2px;
        list-style-type: none;
        /* to stop flickering of text in safari */
        -webkit-font-smoothing: antialiased;
        transform: translate(-110%, 0);
        transition: transform 0.5s var(--ttf);
        z-index: 1;
    }

    #menu.open {
        transform: none;
    }


    li {
        list-style: none;
    }
</style>

<nav>
    <div
        id=menu-button
        class:open
        on:click={() => open = !open}
        >
        CLOSE MENU
    </div>

    <ul id=menu class:open>
        {#each routes as {href, display}}
        <a {href}><li>
                {display}
            </li></a>
            {/each}
    </ul>
</nav>
