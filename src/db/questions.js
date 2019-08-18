import get_valid_copy_of_question from '@/get_valid_copy_of_question';

import get_db_and_user_id from '@/db/get_db_and_user_id';

export async function save_question(question) {
    const {db, user_id} = await get_db_and_user_id();

    const valid_question = get_valid_copy_of_question(question);

    valid_question.owner_id = user_id;

    const collection = db.collection('questions');
    if (question._id) {
        await collection.updateOne({_id: question._id}, valid_question);
    } else {
        await collection.insertOne(valid_question);
    }
}
export function addAuthenticationListener(listener) {
    app.auth.addAuthListener(listener);
}
export function removeAuthenticationListener(listener) {
    app.auth.removeAuthListener(listener);
}

export async function get_questions() {
    const {db, user_id} = await get_db_and_user_id();

    const docs = await db.collection('questions')
        .find({}).asArray();

    return docs;
}

/*
async function find_questions_deprecated({
    // tags are OR'd together, if present
    tags,
    from_date,
    to_date,
    creator,
    types,
}) {

    if (tags.length) {
        query.where('tags').in(tags);
    }
    if (from_date) {
        query.where('created_at').gte(from_date);
    }
    if (to_date) {
        query.where('created_at').lte(to_date);
    }
    if (creator) {
        query.where({creator})
    }
    if (type) {
        query.where({type})
    }

    return await query.lean().exec();
}
*/

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
            console.log("Found docs stringified", JSON.stringify(docs))
            console.log("[MongoDB Stitch] Connected to Stitch")
            return docs;
        } catch (err) {
            console.error(err)
        }
    }
