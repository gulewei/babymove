import type { DisplayInfo, LocalData, TempData } from './interface';
import dayjs from 'dayjs';

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

export function getDisplayInfo(localData: LocalData): DisplayInfo {
    return Object.entries(
        localData.reduce(
            (acc, cur) => {
                const date = dayjs(cur.startts).format('YYYY-MM-DD');
                return {
                    ...acc,
                    [date]: (acc[date] || []).concat(cur),
                };
            },
            {} as Record<string, LocalData>,
        ),
    )
        .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
        .map(([date, localData]) => {
            const babies = Object.entries(
                localData.reduce(
                    (acc, cur) => ({
                        ...acc,
                        [cur.name]: (acc[cur.name] || []).concat(cur),
                    }),
                    {} as Record<string, LocalData>,
                ),
            )
                .sort()
                .map(([name, localData]) => {
                    const details = localData.map(({ startts, endts, moves }) => {
                        return {
                            time: `${dayjs(startts).format('HH:mm')}-${dayjs(endts).format(
                                'HH:mm',
                            )}`,
                            duration: dayjs(endts).diff(startts, 'minute'),
                            moveTimes: moves.length,
                            realMoveTimes: getRealMoves(moves).length,
                        };
                    });
                    const totalDuration = details
                        .map(({ duration }) => duration)
                        .reduce((acc, cur) => acc + cur);
                    return {
                        name,
                        details,
                        estimate:
                            totalDuration > 2 * (60 - 5) /** 2小时，每小时误差50分钟以内 */
                                ? Math.round(
                                      (details
                                          .map(({ realMoveTimes }) => realMoveTimes)
                                          .reduce((acc, cur) => acc + cur) /
                                          totalDuration) *
                                          720 /** 12小时分钟数 */,
                                  )
                                : 0,
                    };
                });
            return {
                date,
                babies,
            };
        });
}
