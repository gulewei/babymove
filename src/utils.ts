import type { LocalData, TempData } from './interface';

const STORAGE_KEY = 'babymove_storage';
export const getLocalStore = () =>
    JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as LocalData;
export const setLocalStore = (store: LocalData) =>
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
export const appendLocalStore = (store: LocalData) => setLocalStore(getLocalStore().concat(store));

const TEMP_KEY = 'boaymove_temp';
export const getTempStore = (name: string) =>
    JSON.parse(localStorage.getItem(`${TEMP_KEY}_${name}`) || '{}') as TempData;
export const setTempStore = (name: string, { startts, moves }: TempData) =>
    localStorage.setItem(`${TEMP_KEY}_${name}`, JSON.stringify({ startts, moves }));
export const removeTempStore = (name: string) => localStorage.removeItem(`${TEMP_KEY}_${name}`);

export const getRealMoves = (moves: number[]) =>
    moves.reduce(
        (acc: number[], cur) =>
            !acc.length
                ? [cur]
                : // 5分钟
                cur - acc[acc.length - 1] >= 5 * 60 * 1000
                ? acc.concat(cur)
                : acc,
        [],
    );
