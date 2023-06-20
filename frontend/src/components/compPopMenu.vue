<template>
    <div class="pop-menu">
        <button class="profile" @click="toggleMenu">
            <img src="@/assets/logo.png" alt="">
        </button>
        <div v-if="showMenu" class="menu">
            <h3>FunkyBird</h3>
            <p>@funkybird</p>
            <router-link to="/profile" class="btn">
                View Profile
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const showMenu = ref(false)
const toggleMenu = () => {
    showMenu.value = !showMenu.value
}
</script>

<style scoped>
.pop-menu {
    position: relative;
}

.profile {
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid #2FA634;
}

.profile img {
    height: 100%;
    object-fit: cover;
}

.menu {
    position: absolute;
    top: 3rem;
    right: 0;
    min-width: 200px;
    background: white;
    box-shadow: 0 0 5px #33333333;
    padding: 1rem;
    border-radius: 15px;
}

.menu h3 {
    font-weight: 600;
}

.menu p {
    font-weight: 200;
    font-size: 0.8rem;
}

.menu .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    width: 100%;
    background: #2FA634;
    margin-top: 1rem;
    color: white;
    text-decoration: none;
}
</style>