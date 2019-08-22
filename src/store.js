import {writable} from 'svelte/store';

export const stitch = writable();

export const user = writable();

export function import_stitch() {
    stitch.set(require('mongodb-stitch-browser-sdk'));
}
