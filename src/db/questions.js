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

const valid_types = ['single', 'multiple', 'true_false', 'order'];
/*
 * Return the question, if valid, with any string fields trimmed, otherwise
 * throw an error. 'creator' is neigher checked nor returned with the valid
 * question.
 */
const get_trimmed_and_validated_question(question) {
    const {
        type,
        prompt,
        choices,
        answer,
        tags = [],
        links = [],
    } = question;

    const valid_question = Object.assign({}, {
        type: get_valid_type(type),
        prompt: get_valid_prompt(prompt),
        choices: get_valid_choices({choices, type}),
        answer: get_valid_answer({answer, choices, type}),
        tags: get_valid_tags(tags),
        links: get_valid_links(links),
    });

    assign_to_valiid_question({type});
    assign_to_valiid_question({});
    






    type: {
        type: String,
        required: true,
    },
    prompt:  {type: String, required: true, trim: true},
    choices: [String],
    answer:  {type: 'mongoose.Mixed', required: true},
    tags: [String],
    links: [String],
    // a user id
    creator: String,


}
const get_valid_type(type) {
    if (!valid_types.contains(type)) {
        throw Error(`unknown type: ${type}`);
    }
    return type;
}

function get_valid_prompt(prompt) {
    if (typeof prompt !== string) {
        throw Error(`prompt must be string: ${prompt}`);
    }

    const trimmed = prompt.trim();

    if (trimmed.length) {
        throw Error(`prompt is empty: ${prompt}`);
    }

    return trimmed;
}

function get_valid_choices({choices, type}) {
    if (type === 'true_false') {
        return;
    } else {
        const choices_is_empty = !Array.isArray(choices) || !choices.length;
        if (choices_is_empty) {
            throw Error(`choices must be a non-empty array: ${choices}`);
        }

        const trimmed_choices = choices.map((choice, i) => {
            if (typeof choice === 'string') {
                throw Error(`choice ${i} is not a string: ${choice}`);
            }
            trimmed = choice.trim();
            if (!trimmed.length) {
                throw Error(`choice ${i} an empty string: ${choice}`);
            }
            return trimmed;
        })

        const choice_set = new Set(choices);
        if (choices.length < choice_set.size) {
            throw Error(`multiple choices are identical`);
        }

        return trimmed_choices;
    }
}

function get_valid_answer({answer, choices, type}) {
    validators_by_type = {
    }
}

const question_schema = [{
    type: {
        type: String,
        required: true,
    },
    prompt:  {type: String, required: true, trim: true},
    choices: [String],
    answer:  {type: 'mongoose.Mixed', required: true},
    tags: [String],
    links: [String],
    // a user id
    creator: String,
}, {
    // mongoose will manage the created_at and updated_at fields
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
}];


module.exports = {
    create_question,
    update_question,
    get_question_by_id,
    find_questions,
};

async function create_question(question) {
//     const created_question = await new Question(question).save();
//     return created_question.id;
}

async function update_question(question) {
//     const {id} = question;
//     const {nModified} = await Question.updateOne({id}, question);
//     if (!nModified) {
//         throw Error(`failed to update question for id ${id}`);
//    }
}
async function get_question_by_id(id) {
    // lean means return a regular js object, no a Document
 //   return await Question.findById(id).lean().exec();
}

async function find_questions({
    // tags are OR'd together, if present
    tags,
    from_date,
    to_date,
    creator,
    types,
}) {
  //  const query = Question.find();

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



/*
onMount(() => module.exports = {
    testQuery: new Promise(resolve => {
        const {
            Stitch,
            RemoteMongoClient,
            AnonymousCredential
        } = require('mongodb-stitch-browser-sdk');

        console.log('i ran');
        console.dir(Stitch);

        return resolve(testQuery);

    })
}
*/


