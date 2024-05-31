<!--  -->
<template>
    <div class="main" :class="isPc ? 'main-pc' : ''">
        <img class="logo-img" src="../assets/img/logo.png" alt="">
        <img class="title-img" src="../assets/img/title.png" alt="">
        <img class="wine-img" src="../assets/img/wine.png" alt="">
        <router-view v-slot="{ Component }" v-if="$route.meta.keepAlive" style="width: 100%;">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
        <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath" id="router-view" style="width: 100%;"></router-view>
    </div>
</template>

<script setup>
    import { onMounted} from 'vue'
    import {isPcWindow} from '@/assets/utils/index'
    const isPc = isPcWindow()
    onMounted(() => {
    })
</script>
<style lang='scss' scoped>
.main{background: url($basic_static+'bg.png');height: 100vh;background-size: 100% 100%;position: relative;
    .logo-img{width: 110px;height: auto;position: absolute; top: 20px; left: 20px;}
    .title-img{width: 220px;height: auto;position:absolute;top: 66px;left: 50%;transform: translateX(-50%);}
    .wine-img{width: 210px;height: auto;position:absolute;bottom: 0;left: 50%; transform: translateX(-50%);}
}
.main-pc{
    .title-img{width: 300px;}
}
</style>