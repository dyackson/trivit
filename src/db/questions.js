import get_valid_copy_of_question from '@/get_valid_copy_of_question';

import get_db_and_user_id from '@/db/get_db_and_user_id';

export async function save_question(question) {
    /*
    const {db, user_id} = get_db_and_user_id();

    const valid_question = get_valid_copy_of_question(question);

    question.owner_id = client.auth.user.id;
    await db.collection('questions')
        .updateOne({owner_id: client.auth.user.id},
            {$set:{number:42}},
            {upsert:true});

*/
}

export async function get_questions() {
}

export async function test_query() {
    const {db, user_id} = await get_db_and_user_id();
    try {
        await db.collection('questions')
            .updateOne({owner_id: user_id},
                {$set:{number:42}},
                {upsert:true});

        const docs = await db.collection('questions')
            .find({owner_id: user_id},
                {limit: 100}).asArray();

        console.log("Found docs", docs)
        console.log("[MongoDB Stitch] Connected to Stitch")
        return docs;
    } catch (err) {
        console.error(err)
    }
}
