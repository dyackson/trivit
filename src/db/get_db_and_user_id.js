let db, client;

export default async function get_db_and_user_id() {

    if (!db) {
        const stitch = require('mongodb-stitch-browser-sdk');

        const {
            Stitch,
            RemoteMongoClient,
            AnonymousCredential
        } = stitch;

        client = Stitch.initializeDefaultAppClient('trivit-sdpry');

        db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
            .db('trivia');

        await client.auth.loginWithCredential(new AnonymousCredential());
    }

    return {db, user_id: client.auth.user.id};
}
