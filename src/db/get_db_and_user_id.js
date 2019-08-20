import * as store  from '@/store';
console.dir(store);

const stitch_store = store.stitch;
console.dir(stitch_store);

let stitch, db, client;

stitch_store.subscribe((val) => {
    stitch = val;

    if (stitch) {
        check_for_redirect_results();
    }
});

export function get_db() {
    if (!db) {
        client = stitch.Stitch.initializeDefaultAppClient('trivit-sdpry');

        db = client
            .getServiceClient(stitch.RemoteMongoClient.factory, 'mongodb-atlas')
            .db('trivia');
    }

    return db;
}

export async function logout() {
    await client.auth.logout();
    store.user.set(undefined);
}

export async function login_anonymous() {
    const user = await client.auth
        .loginWithCredential(new stitch.AnonymousCredential());
    console.log(user);
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
        console.log(user);
    }
}


