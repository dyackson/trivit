
<script>
    import {login_anonymous, logout, login_google} from '@/login_logout';
    import * as store from '@/store';

    let user = store.user;
</script>

<button
    class=button
    type=button
    on:click={login_anonymous}>
    Login Anon
</button>

<button
    class=button
    type=button
    on:click={login_google}>
    Login Google
</button>

<button
    class=button
    type=button
    on:click={logout}>
    Logout
</button>

<div>
    {Object.entries($user || {})}
</div>
