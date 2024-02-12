import type { LocalData } from './interface';

const STORAGE_KEY = 'babymove_storage';
export const getLocalStore = () =>
    JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as LocalData;
export const setLocalStore = (store: LocalData) =>
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
export const appendLocalStore = (store: LocalData) => setLocalStore(getLocalStore().concat(store));

export const getRealMoves = (moves: number[]) =>
    moves.reduce(
        (acc: number[], cur) =>
            !acc.length
                ? [cur]
                : // 3分钟
                cur - acc[acc.length - 1] >= 3 * 60 * 1000
                ? acc.concat(cur)
                : acc,
        [],
    );
