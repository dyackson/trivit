import * as store  from '@/store';

let stitch, db, client;

store.stitch.subscribe((val) => {
    stitch = val;

    if (stitch) {
        console.dir(stitch);
        ensure_client();
        ensure_db();
        check_for_redirect_results();
    }
});

store.user.subscribe((val) => {
    console.log('user', val);
});

function ensure_client() {
    if (!client) {
        client = stitch.Stitch.initializeDefaultAppClient('trivit-sdpry');
    }
}

function ensure_db() {
    if (!db) {
        db = client
            .getServiceClient(stitch.RemoteMongoClient.factory, 'mongodb-atlas')
            .db('trivia');
    }
}

export function get_db() {
    return db;
}

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
    if (client && client.auth.hasRedirectResult()) {
        const user = await client.auth.handleRedirectResult()
        store.user.set(user);
    }
}


