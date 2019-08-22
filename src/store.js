import {writable} from 'svelte/store';

export const stitch = writable();

export const client = writable();

export const user = writable();

export const db = writable();

export function import_stitch() {
    const _stitch = require('mongodb-stitch-browser-sdk');
    stitch.set(_stitch);

    const _client = _stitch.Stitch.initializeDefaultAppClient('trivit-sdpry');
    client.set(_client);

    const _db = _client
        .getServiceClient(_stitch.RemoteMongoClient.factory, 'mongodb-atlas')
        .db('trivia');
    db.set(_db);
}
