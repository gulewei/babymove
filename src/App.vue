<template>
    <router-view v-slot="{ Component }">
        <keep-alive include="BabyMove">
            <component :is="Component" />
        </keep-alive>
    </router-view>
</template>
