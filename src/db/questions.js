import {readable} from 'svelte/store';
import {assign} from 'lodash';

export const foo = 'foo';

let stitch;
export async function get_db() {
    let db, client;

    if (!stitch) {
        stitch = require('mongodb-stitch-browser-sdk');

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


    return {testQuery};

    async function createQuestion
    async function testQuery() {
        try {
            await db.collection('questions')
                .updateOne({owner_id: client.auth.user.id},
                    {$set:{number:42}},
                    {upsert:true});

            const docs = await db.collection('questions')
                .find({owner_id: client.auth.user.id},
                    {limit: 100}).asArray();

            console.log("Found docs", docs)
            console.log("[MongoDB Stitch] Connected to Stitch")
            return docs;
        } catch (err) {
            console.error(err)
        }
    }
}
