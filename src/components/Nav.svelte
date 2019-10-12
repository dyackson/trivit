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
    nav {
        font-size: calc(2vw + .5em);
    }

    #menu-button {
        position: relative;
        top: 1em;
        left: 1em;
        cursor: pointer;
        z-index: 2;
    }

    #menu-button.open {
        color: black;
        transition: color 1s cubic-bezier(0.77,0.2,0.05,1.0);
    }

    #open-text {
        opacity: 1;
        transition: opacity 1s cubic-bezier(0.86, 0, 0.07, 1);
    }

    /* this text is invisible */
    #open-text.open {
        opacity: 0;
        transition: opacity 1s cubic-bezier(0.86, 0, 0.07, 1);
    }

    #close-text {
        opacity: 0;
        transition: opacity 1s cubic-bezier(0.86, 0, 0.07, 1);
    }
    /* this text IS visible */
    #close-text.open {
        opacity: 1;
        transition: opacity 1s cubic-bezier(0.86, 0, 0.07, 1);
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
        transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
        z-index: 1;
    }

    #menu.open {
        transform: none;
    }

    .overlapped {
        position: absolute;
        top: 0;
        left: 0;
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
        <div id=open-text class:open>CLOSE MENU</div>
    </div>

    <ul id=menu class:open>
        {#each routes as {href, display}}
        <a {href}><li>
                {display}
            </li></a>
            {/each}
    </ul>
</nav>
