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

</style>
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <!--a class="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
    </a-->

        <a role="button"
           on:click|preventDefault={() => open = !open}
           class="navbar-burger burger"
           aria-label="menu"
           aria-expanded={open}
           data-target="navbar"
           >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <!-- the is-active class is what opens and closes it on mobile
       We need to close it when it's clicked
    -->
  <div id="navbar" class="navbar-menu"
    class:is-active={open}
       >
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
