<template>
    <div class="like-menu">
        <button @click="setLike(1)" @touchstart="showMenu" @mouseover="showMenu" class="main-img">
            <span v-if="like">{{ like.emoji }}</span>
            <img v-else src="@/assets/heart.png" alt="" oncontextmenu="return false;">
        </button>
        <transition name="menu">
            <div class="menu-deck" v-if="viewMenu" @mouseleave="hideMenu">
                <button @click=" setLike(index)" v-for="(like, index) in likes" :key="index" @touchend="setLike(index)">
                    {{ like.emoji }}
                </button>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref } from "vue";

const viewMenu = ref(false)
const like = ref(null)
const likes = [
    {
        emoji: '👍',
    },
    {
        emoji: '❤️',
    },
    {
        emoji: '😄',
    },
    {
        emoji: '😲',
    },
    {
        emoji: '😢',
    },
    {
        emoji: '😡',
    },
]


const showMenu = () => {
    viewMenu.value = true
}

const hideMenu = () => {
    viewMenu.value = false
}

const setLike = (index) => {
    like.value = likes[index]
    viewMenu.value = false
}
</script>

<style scoped>
.like-menu {
    position: relative;
}

.like-menu .main-img {
    background: none;
    border: none;
}

.like-menu .main-img img {
    height: 1.5rem;
    user-select: none;
}

.like-menu .main-img span {
    font-size: 1.5rem;
    user-select: none;
}

.like-menu .menu-deck {
    position: absolute;
    display: flex;
    align-items: center;
    padding: 1rem;
    gap: 1rem;
    top: -4rem;
    left: 0;
    background: white;
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.like-menu .menu-deck button {
    font-size: 1.5rem;
    background: none;
    border: none;
    user-select: none;
}

.menu-enter-from,
.menu-leave-to {
    top: 0;
    transform: scale(0);
    transform-origin: bottom left;
}

.menu-enter-active,
.menu-leave-active {
    transition: 0.25s all;
}

@media screen and (max-width:769px) {
    .like-menu .main-img img {
        height: 1.3rem;
    }

    .like-menu .main-img span {
        font-size: 1.3rem;
    }
}
</style>