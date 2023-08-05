<template>
    <div class="profile">
        <div class="left">
            <img class="prof-pic" :src="profile.profile_picture" alt="">
            <h4>{{ profile.first_name }} {{ profile.last_name }}</h4>
            <p class="uname">@{{ profile.user_name }}</p>
            <ul>
                <li><img src="../../assets/M" alt=""></li>
                <li v-if="profile.sex"><img src="../../assets/man.png" alt=""> Male</li>
                <li v-else><img src="../../assets/woman.png" alt=""> Male</li>
            </ul>
        </div>
        <div class="right"></div>
    </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()
const username = route.params.username
const profile = ref({})

const getProfile = async () => {
    try {
        const res = await axios.get(`/profile/${username}`)
        return res.data
    }
    catch (err) {
        store.commit("addError", err.response.data.message)
    }
}

onMounted(async () => {
    profile.value = await getProfile()
})
</script>

<style scoped>
.left {
    position: fixed;
    left: 0;
    width: 40%;
    height: 100vh;
    max-width: 450px;
    padding: 3rem 2rem;
}

.left .prof-pic {
    height: 200px;
    width: 200px;
    border-radius: 50%;
    object-fit: cover;
    border: 5px solid #15E630;
}

.left h4 {
    font-size: 1.5rem;
    margin-top: 1rem;
    font-weight: 500;
}

.left .uname {
    margin-top: 5px;
    font-weight: 500;
    color: #029432;
}

.left ul {
    margin: 1.5rem 0;
}

.left ul li {
    display: grid;
    grid-template-columns: 20px auto;
    margin: 10px 0;
}

.left ul li img {
    width: 20px;
}
</style>