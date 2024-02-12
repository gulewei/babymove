<template>
    <div>
        <h1>我的记录</h1>
        <div v-for="{ date, babies } in displayList" :key="date" class="datewrap">
            <h2 class="date">{{ date }}</h2>
            <div class="namewrap" v-for="{ name, detail, estimate } in babies" :key="name">
                <h3>
                    <span class="name">{{ name }}</span>
                    <span class="estimate">12小时推算: {{ estimate }}</span>
                </h3>
                <div class="detail" v-for="{ time, duration, realMoveTimes } in detail" :key="time">
                    <div class="time">{{ time }}</div>
                    <div class="duraton">{{ duration }}分钟</div>
                    <div class="realmovetimes">{{ realMoveTimes }}次</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import type { LocalData } from '../interface';
import { getLocalStore, getRealMoves } from '../utils';
import dayjs from 'dayjs';
export default {
    data() {
        return {
            localData: [] as LocalData,
        };
    },
    computed: {
        displayList() {
            return Object.entries(
                this.localData.reduce(
                    (acc, cur) => ({
                        ...acc,
                        [cur.startts]: (acc[cur.startts] || []).concat(cur),
                    }),
                    {} as Record<string, LocalData>,
                ),
            ).map(([startts, localData]) => {
                const startDate = dayjs(Number(startts));
                const babies = Object.entries(
                    localData.reduce(
                        (acc, cur) => ({
                            ...acc,
                            [cur.name]: (acc[cur.name] || []).concat(cur),
                        }),
                        {} as Record<string, LocalData>,
                    ),
                ).map(([name, localData]) => {
                    const detail = localData.map(({ endts, moves }) => ({
                        time: startDate.format('HH:mm'),
                        duration: Math.ceil(startDate.diff(endts, 'minute', true) * -1),
                        realMoveTimes: getRealMoves(moves).length,
                    }));
                    const totalDuration = detail
                        .map(({ duration }) => duration)
                        .reduce((acc, cur) => acc + cur);
                    return {
                        name,
                        detail,
                        estimate:
                            totalDuration > 165 /** 3小时，误差15分钟以内 */
                                ? (detail
                                      .map(({ realMoveTimes }) => realMoveTimes)
                                      .reduce((acc, cur) => acc + cur) /
                                      totalDuration) *
                                  1440 /** 天分钟数 */
                                : 0,
                    };
                });
                return {
                    date: startDate.format('YYYY-MM-DD'),
                    babies,
                };
            });
        },
    },
    created() {
        this.localData = getLocalStore();
    },
};
</script>
