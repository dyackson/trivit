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
            display: 'Home',
            segment: 'home',
            href: '.',
        },
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
            display: 'Create Question',
            segment: 'question/create',
            href: 'question/create',
        },
    ];


</script>

<style>
nav {
    border-bottom: 1px solid rgba(255,62,0,0.1);
    font-weight: 300;
    padding: 0 1em;
}

    ul {
        margin: 0;
        padding: 0;
    }

    /* clearfix */
    ul::after {
        content: '';
        display: block;
        clear: both;
    }

    li {
        display: block;
        float: left;
    }

    .selected {
        position: relative;
        display: inline-block;
    }

    .selected::after {
        position: absolute;
        content: '';
        width: calc(100% - 1em);
        height: 2px;
        background-color: rgb(255,62,0);
        display: block;
        bottom: -1px;
    }

    a {
        text-decoration: none;
        padding: 1em 0.5em;
        display: block;
    }
</style>

<nav>
    <ul>
        {#each routes as {segment, href, display}}
        <li>
            <a class='{current === segment ? "selected" : ""}' {href}>
                {display}
            </a>
        </li>
        {/each}

        <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
            the blog data when we hover over the link or tap it on a touchscreen -->
            <!-- li><a rel=prefetch class='{segment === "blog" ? "selected" : ""}'
                href='blog'>blog</a></li -->
    </ul>
</nav>
<!--
<nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item" >
            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
        </a>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
            <a class="navbar-item">
                Home
            </a>

            <a class="navbar-item">
                Documentation
            </a>

            <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">
                    More
                </a>

                <div class="navbar-dropdown">
                    <a class="navbar-item">
                        About
                    </a>
                    <a class="navbar-item">
                        Jobs
                    </a>
                    <a class="navbar-item">
                        Contact
                    </a>
                    <hr class="navbar-divider">
                    <a class="navbar-item">
                        Report an issue
                    </a>
                </div>
            </div>
        </div>

        <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                    <a class="button is-primary">
                        <strong>Sign up</strong>
                    </a>
                    <a class="button is-light">
                        Log in
                    </a>
                </div>
            </div>
        </div>
    </div>
</nav>
-->
