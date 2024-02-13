<template>
    <div>
        <MoveCounting v-for="name in coutings" :key="name" :name="name"></MoveCounting>
        <RouterLink to="/list">查看记录</RouterLink>
    </div>
</template>
<script lang="ts">
import { getCurrentInstance } from 'vue';
import MoveCounting from '../components/MoveCounting.vue';
import NoSleep from 'nosleep.js';
const noSleep = new NoSleep();
export default {
    name: 'BabyMove',
    components: {
        MoveCounting,
    },
    data() {
        return {
            coutings: ['大崽', '小崽'],
        };
    },
    activated() {
        // Enable wake lock.
        // (must be wrapped in a user input event handler e.g. a mouse or touch handler)
        const vm = getCurrentInstance();
        document.addEventListener(
            'click',
            function enableNoSleep() {
                document.removeEventListener('click', enableNoSleep, false);
                noSleep.enable().then(() => {
                    if (vm?.isDeactivated) {
                        noSleep.disable();
                    }
                });
            },
            false,
        );
    },
    deactivated() {
        // Disable wake lock at some point in the future.
        // (does not need to be wrapped in any user input event handler)
        noSleep.disable();
    },
};
</script>
