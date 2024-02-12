<template>
    <div>
        <MoveCounting v-for="name in coutings" :key="name" :name="name"></MoveCounting>
        <RouterLink to="/list">查看记录</RouterLink>
    </div>
</template>
<script lang="ts">
import MoveCounting from '../components/MoveCounting.vue';
export default {
    components: {
        MoveCounting,
    },
    data() {
        return {
            coutings: ['大崽', '小崽'],
        };
    },
};
</script>
