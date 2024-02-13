<template>
    <div>
        <h1>我的记录</h1>
        <div v-for="{ date, babies } in displayInfo" :key="date">
            <h2 class="date">{{ date }}</h2>
            <div v-for="{ name, details, estimate } in babies" :key="name">
                <h3 class="name">
                    <span>{{ name }}</span>
                    <span class="estimate">12小时推算: {{ estimate }}</span>
                </h3>
                <div
                    class="detail"
                    v-for="{ time, duration, moveTimes, realMoveTimes } in details"
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
import type { DisplayInfo } from '../interface';
import { getLocalStore, getDisplayInfo } from '../utils';
export default {
    data() {
        return {
            displayInfo: [] as DisplayInfo,
        };
    },
    created() {
        this.displayInfo = getDisplayInfo(getLocalStore());
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
    font-weight: normal;
    font-size: 14px;
    margin: 12px 12px;
}
.estimate {
    color: #ff5860;
}

.detail {
    display: flex;
    margin-bottom: 4px;
}

.detail-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.detail-item strong {
    font-weight: normal;
    font-size: 14px;
}

.detail-item span {
    color: #b4b4b4;
    font-size: 14px;
}
</style>
