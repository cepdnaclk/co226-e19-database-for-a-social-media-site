<template>
    <div class="signup">
        <img class="bg" src="@/assets/_add558a1-c25c-47a9-8a6e-67ca5f1dce1d.jpg" alt="">
        <div class="container">
            <div class="header">
                <div class="progress-bar">
                    <div class="progress-line">
                        <div class="progress-fill" :style="`width:${(activeRouteIndex - 1) * 50}%`"></div>
                    </div>
                    <div :class="`progress-point ${activeRouteIndex > 0 ? 'active' : ''} ${activeRouteIndex === 1 ? 'exactactive' : ''}`"
                        id="prog1">1</div>
                    <div :class="`progress-point ${activeRouteIndex > 1 ? 'active' : ''} ${activeRouteIndex === 2 ? 'exactactive' : ''}`"
                        id="prog2">2</div>
                    <div :class="`progress-point ${activeRouteIndex > 2 ? 'active' : ''} ${activeRouteIndex === 3 ? 'exactactive' : ''}`"
                        id="prog3">3</div>
                </div>
            </div>
            <div class="body">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const activeRouteIndex = ref(1)

</script>

<style scoped>
.signup {
    position: relative;
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
}

.signup .bg {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
    object-fit: cover;
}

.signup .container {
    border-radius: 2rem;
    background: white;
    padding: 2rem;
    min-height: 80vh;
}

.signup .header {
    height: 5rem;
    display: grid;
    place-content: center;
}

.header .progress-bar {
    height: 30px;
    width: 60vw;
    min-width: 250px;
    max-width: 700px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
}

.header .progress-bar .progress-point {
    height: 20px;
    width: 20px;
    display: flex;
    place-content: center;
    align-items: center;
    border-radius: 50%;
    background: #bbb;
    z-index: 2;
    font-size: 0.8rem;
    font-weight: 600;
    color: white;
    transition: 0.5s 1s transform;
}

.header .progress-bar .progress-point.active {
    background: #2FA634;
}

.header .progress-bar .progress-point.exactactive {
    transform: scale(1.2);
}

.header .progress-bar .progress-line {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 3px;
    width: calc(100% - 6px);
    transform: translate(-50%, -50%);
    background: #bbb;
}

.header .progress-bar .progress-fill {
    position: absolute;
    top: 0%;
    height: 3px;
    width: 50%;
    background: #2FA634;
    transition: 1s all;
}
</style>