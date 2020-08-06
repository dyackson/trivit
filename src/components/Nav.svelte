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
            display: 'Play',
            segment: 'play',
            href: 'play',
        },
        {
            display: 'Text GET/POST',
            segment: 'home',
            href: '.',
        },
        {
            display: 'Login',
            segment: 'login_logout',
            href: 'login_logout',
        },
        {
            display: 'Create Question',
            segment: 'create_question',
            href: 'create_question',
        },
    ];

    let open = false;
</script>

<style>

    nav {
        font-size: calc(2vw + .5em);
        height: 2em;
    }

    #menu-button {
        position: relative;
        top: 1em;
        left: 1em;
        cursor: pointer;
        z-index: 2;
        width: fit-content;
        transform: translate(-4em, 0);
        transition: transform 0.5s var(--ttf);
    }

    #menu-button.open {
        color: var(--dark);
        transform: none;
        transition: color, transform 0.5s var(--ttf);
    }

    #menu {
        background: var(--light);
        color: var(--dark);
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
        border-bottom-right-radius: 5em;
    }

    #menu.open {
        transform: none;
    }

    a {
        text-decoration: none;
        color: var(--dark);
    }

    a:hover {
        color: tomato;
    }

    li {
        list-style: none;
        font-size: 1.5em;
        margin-bottom: .5em;
    }

    a:last-of-type > li {
        margin-bottom: 0;
    }
</style>
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <!--a class="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
    </a-->

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <!-- the is-active class is what opens and closes it on mobile
       We need to close it when it's clicked
    -->
  <div id="navbarBasicExample" class="navbar-menu is-active">
    <div class="navbar-start">
        {#each routes as {href, display}}
            <a class=navbar-item
                {href}
                on:click={() => open = false}
                >
                {display}
            </a>
        {/each}
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
