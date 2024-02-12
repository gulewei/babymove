<template>
    <div class="wraper">
        <div class="clickbox">
            <div class="clickbox-time">
                <strong>{{ moves.length }}</strong>
                <span>点击次数</span>
            </div>
            <button class="clickbox-action" v-if="startts" @click="handleClick">{{ name }}</button>
            <button class="clickbox-action" v-else @click="handleStart">
                开始<br />{{ name }}
            </button>
            <div class="clickbox-time">
                <strong>{{ realMoves.length }}</strong>
                <span>有效次数</span>
            </div>
        </div>
        <div class="buttons">
            <div class="countdown">{{ countdown }}</div>
            <button class="end" v-if="startts" @click="handleEnd">结束</button>
        </div>
    </div>
</template>
<script lang="ts">
import type { PropType } from 'vue';
import dayjs from 'dayjs';
import { appendLocalStore, getRealMoves } from '../utils';
export default {
    props: {
        name: {
            type: String as PropType<string>,
            default: '',
        },
    },
    data() {
        return {
            startts: 0,
            now: 0,
            moves: [] as number[],
            countdown: ' ',
            cleanup: () => {},
        };
    },
    computed: {
        realMoves() {
            return getRealMoves(this.moves);
        },
    },
    methods: {
        handleStart() {
            this.startts = Date.now();
            this.countdown = ' ';
            const onFrame = () => {
                this.countdown = dayjs(Date.now() - this.startts)
                    .format('mm:ss:SSS')
                    .slice(0, -1);
                const raf = requestAnimationFrame(onFrame);
                this.cleanup = () => {
                    cancelAnimationFrame(raf);
                };
            };
            onFrame();
        },
        handleEnd() {
            this.cleanup();
            this.startts = 0;
            const endts = Date.now();
            appendLocalStore([
                { name: this.name, startts: this.startts, endts, moves: this.moves },
            ]);
        },
        handleClick() {
            this.moves.push(Date.now());
        },
    },
    beforeUnmount() {
        this.cleanup();
    },
};
</script>
<style scoped>
.wraper {
    margin: 48px 0 30px 0;
}

.clickbox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
}

.clickbox-action {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    font-size: 30px;
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background: linear-gradient(140deg,#ff7b6c,#ff5f66);
}
.clickbox-action:active {
    opacity: .8;
}

.clickbox-time {
    flex: 1;
}

.clickbox-time strong {
    display: block;
    font-size: 32px;
    color: #666;
}

.clickbox-time span {
    font-size: 14px;
    color: #b4b4b4;
}

.buttons {
    display: flex;
    justify-content: space-between;
    height: 36px;
}

.countdown {
    font-size: 18px;
    line-height: 2em;
    padding: 0 1em;
    color: #b4b4b4;
}

.end {
    font-size: 18px;
    line-height: 2em;
    border: 0;
    border-radius: 1em;
    padding: 0 1em;
    color: #666;
}
</style>
