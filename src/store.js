import {writable} from 'svelte/store';

export const stitch = writable(undefined);

export const user = writable(undefined);

export function import_stitch() {
    stitch.set(require('mongodb-stitch-browser-sdk'));
}
