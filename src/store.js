import {writable} from 'svelte/store';

export const stitch = writable();

export const client = writable();

export const user = writable();

export const db = writable();

let _stitch, _client, _db;
export function import_stitch() {
    if (!_stitch) {
        _stitch = require('mongodb-stitch-browser-sdk');
        stitch.set(_stitch);
    }

    if (!_client) {
        _client = _stitch.Stitch.initializeDefaultAppClient('trivit-sdpry');
        client.set(_client);
    }

    if (!_db) {
        _db = _client
            .getServiceClient(_stitch.RemoteMongoClient.factory, 'mongodb-atlas')
            .db('trivia');
        db.set(_db);
    }
}
