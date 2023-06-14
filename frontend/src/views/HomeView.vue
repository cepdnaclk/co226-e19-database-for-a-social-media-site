<template>
  <div class="home">
    <div class="nav-bar">
      <div class="container">
        <div class="logo">
          <img src="@/assets/logo.png" alt="">
          <h3>eraLink</h3>
        </div>
        <div class="links">
          <router-link to="/"><img src="@/assets/Home_light.png" alt=""></router-link>
          <router-link to="/freinds"><img src="@/assets/Group_light.png" alt=""></router-link>
        </div>
        <button class="profile">
          <img src="@/assets/logo.png" alt="">
        </button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref } from "vue";

</script>

<style scoped>
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.151);
}

.nav-bar .container {
  height: 4rem;
  display: flex;
  align-items: center;
}

.nav-bar .logo {
  display: flex;
  align-items: baseline;
  font-size: 1.7rem;
  color: #2FA634;
}

.nav-bar .logo h3 {
  font-weight: 500;
}

.nav-bar .logo img {
  height: 2rem;
}

.links {
  margin: auto;
  display: flex;
  align-items: flex-end;
  gap: 2rem;
}

.links a {
  display: flex;
  align-items: baseline;
}

.links img {
  height: 2rem;
}

.nav-bar .profile {
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #2FA634;
}

.nav-bar .profile img {
  height: 100%;
  object-fit: cover;
}
</style>
