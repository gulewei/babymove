<template>
    <div>123</div>
</template>
<script lang="ts">
import type { LocalData, DisplayList } from '../interface';
import { getLocalStore, getRealMoves } from '../utils';
export default {
    data() {
        return {
            localData: [] as LocalData,
        };
    },
    computed: {
        displayList() {
            return this.localData.reduce((acc: DisplayList, cur) => ({}), {});
        },
    },
    created() {
        this.localData = getLocalStore();
    },
};
</script>
