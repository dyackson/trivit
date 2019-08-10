<script context=module language=javascript>
    /*
    const {
        Stitch,
        RemoteMongoClient,
        AnonymousCredential,
    } = stitch;

    export async function testQuery() {
        try {
            const client = Stitch.initializeDefaultAppClient('trivit-sdpry');

            const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
                .db('trivia');
            await client.auth.loginWithCredential(new AnonymousCredential());

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
    */
</script>
