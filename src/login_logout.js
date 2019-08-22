import * as store  from '@/store';

let stitch, client;

store.stitch.subscribe((val) => stitch = val);

store.client.subscribe((val) => {
    client = val;
    if (client) {
        check_for_redirect_results();
    }
})

// TODO: remove in production
store.user.subscribe((val) => console.log('user', val));

export async function logout() {
    await client.auth.logout();
    store.user.set(undefined);
}

export async function login_anonymous() {
    const user = await client.auth
        .loginWithCredential(new stitch.AnonymousCredential());
    store.user.set(user);
}

export function login_google() {
    if (!client.auth.isLoggedIn) {
        const credential = new stitch.GoogleRedirectCredential();
        client.auth.loginWithRedirect(credential);
    }
}

async function check_for_redirect_results() {
    if (client.auth.hasRedirectResult()) {
        const user = await client.auth.handleRedirectResult()
        store.user.set(user);
    }
}
