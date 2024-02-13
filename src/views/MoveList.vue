<template>
    <div>
        <h1>我的记录</h1>
        <div v-for="{ date, babies } in displayList" :key="date">
            <h2 class="date">{{ date }}</h2>
            <div v-for="{ name, detail, estimate } in babies" :key="name">
                <h3 class="name">
                    <span>{{ name }}</span>
                    <span class="estimate">12小时推算: {{ estimate }}</span>
                </h3>
                <div
                    class="detail"
                    v-for="{ time, duration, moveTimes, realMoveTimes } in detail"
                    :key="time"
                >
                    <div class="detail-item">
                        <strong>{{ duration }}分钟</strong>
                        <span>{{ time }}</span>
                    </div>
                    <div class="detail-item">
                        <strong>{{ moveTimes }}</strong>
                        <span>实际点击</span>
                    </div>
                    <div class="detail-item">
                        <strong>{{ realMoveTimes }}</strong>
                        <span>有效胎动</span>
                    </div>
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
                    (acc, cur) => {
                        const date = dayjs(cur.startts).format('YYYY-MM-DD');
                        return {
                            ...acc,
                            [date]: (acc[date] || []).concat(cur),
                        };
                    },
                    {} as Record<string, LocalData>,
                ),
            ).map(([date, localData]) => {
                const babies = Object.entries(
                    localData.reduce(
                        (acc, cur) => ({
                            ...acc,
                            [cur.name]: (acc[cur.name] || []).concat(cur),
                        }),
                        {} as Record<string, LocalData>,
                    ),
                ).map(([name, localData]) => {
                    const detail = localData.map(({ startts, endts, moves }) => {
                        const startDate = dayjs(startts);
                        return {
                            time: `${startDate.format('HH:mm')}-${dayjs(endts).format('HH:mm')}`,
                            duration: Math.ceil(startDate.diff(endts, 'minute', true) * -1),
                            moveTimes: moves.length,
                            realMoveTimes: getRealMoves(moves).length,
                        };
                    });
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
                    date,
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
<style scoped>
h1 {
    font-size: 24px;
}
.date {
    font-size: 16px;
    margin: 16px 0;
}
.name {
    display: flex;
    justify-content: space-between;
    /* font-weight: normal; */
    font-size: 16px;
    margin: 12px 12px;
}
.estimate {
    color: #ff5860;
}

.detail {
    display: flex;
}

.detail-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.detail-item:not(:last-child) {
    margin-bottom: 14px;
}

.detail-item strong {
    font-weight: normal;
}

.detail-item span {
    color: #b4b4b4;
    font-size: 14px;
}
</style>
