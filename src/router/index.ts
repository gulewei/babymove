import { createRouter, createWebHashHistory } from 'vue-router';
import BabyMove from '../views/BabyMove.vue';
import MoveList from '../views/MoveList.vue';

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'BabyMove',
            component: BabyMove,
        },
        {
            path: '/list',
            name: 'MoveList',
            component: MoveList,
        },
    ],
});

export default router;
