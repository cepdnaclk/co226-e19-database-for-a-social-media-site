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
          <router-link to="/find-friends"><img src="@/assets/Group_light.png" alt=""></router-link>
        </div>
        <comp-pop-menu />
      </div>
    </div>
    <router-view></router-view>
    <router-link to="/create" class="create"><img src="../assets/Edit_fill.png" alt=""><span>Create
        Post</span></router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";
import compPopMenu from "@/components/compPopMenu.vue";

</script>

<style scoped>
.home {
  padding-top: 4rem;
}

.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: white;
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
  border-bottom: 2px solid transparent;
  transition: 0.5s all;
}

.links a.router-link-active.router-link-exact-active {
  border-bottom: 2px solid #2FA634;
}

.links img {
  height: 2rem;
}

.create {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #043228;
  color: white;
  gap: 10px;
  border-radius: 2rem;
  text-decoration: none;
}

.create img {
  filter: invert();
  height: 20px;
}

@media screen and (max-width: 769px) {
  .nav-bar .container {
    padding: 0 1rem;
  }

  .nav-bar .logo h3 {
    display: none;
  }

  .create {
    left: auto;
    right: 1rem;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    padding: 0 0 3px;
    justify-content: center;
  }

  .create span {
    display: none;
  }
}
</style>
