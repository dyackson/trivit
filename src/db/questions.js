import get_valid_copy_of_question from '@/get_valid_copy_of_question';

import * as store from '@/store';

let user, db, stitch;

store.user.subscribe(val => user = val);
store.db.subscribe(val => db = val);
store.stitch.subscribe(val => stitch = val);

export async function save_question(question) {
    const valid_question = get_valid_copy_of_question(question);

    valid_question.owner_id = user.id;

    const collection = db.collection('questions');
    if (!question._id) {
        question._id = new stitch.BSON.ObjectId();
    }

    await collection.updateOne({_id: question._id}, valid_question,
        {upsert: true});
}

export async function get_questions() {
    // TODO - all that stuff below in the deprecated fn
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
