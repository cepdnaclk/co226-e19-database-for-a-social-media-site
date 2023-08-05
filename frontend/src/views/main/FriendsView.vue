<template>
    <div class="container">
        <h3>Connect with your friends on <span>Peralink</span></h3>
        <div class="search">
            <input type="text" placeholder="search friend" v-model="search">
        </div>
        <div class="deck">
            <router-link :to="`profile/${user.user_name}`" class="card" v-for="(user, index) in users" :key="index">
                <img :src="user.profile_picture" alt="" class="prof-pic">
                <h4>{{ user.first_name }} {{ user.last_name }}</h4>
                <p>@{{ user.user_name }}</p>
                <button @click="">Send Request</button>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";

const search = ref("")
const loading = ref(false)
const store = useStore()

const users = ref([])

watch(search, async () => {
    const list = await getUsers(search.value.length > 0 ? search.value : "%")
    users.value = list
})

onMounted(async () => {
    users.value = await getUsers("%")
})

const getUsers = async (query) => {
    try {
        const response = await axios.get("/search_global/", {
            params: {
                q: query,
            }
        })
        return response.data
    }
    catch (err) {
        store.commit("addError", err)
    }
}
</script>

<style scoped>
h3 {
    margin: 3rem 0 2rem;
    font-size: 1.5rem;
    font-weight: 500;
}

h3 span {
    color: #2FA634;
    font-family: 'Raleway', sans-serif;
    font-weight: 600;
}

.search {
    display: block;
    max-width: 500px;
    width: 100%;
    margin: auto;
    margin: 1rem auto;
}

.search input {
    width: 100%;
}

.deck {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    margin-top: 2rem;
}

.deck .card {
    box-shadow: 0 0 10px #00000011;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1rem;
    text-decoration: none;
    color: #222;
}

.deck .card img {
    margin: 1rem 0;
    height: 100px;
    width: 100px;
    border-radius: 50%;
    object-fit: cover;
}

.deck .card h4 {
    font-weight: 500;
}

.deck .card p {
    font-size: 0.8rem;
    font-weight: 500;
    margin-top: 5px;
    color: #2FA634;
}

.deck .card button {
    display: block;
    padding: 0.5rem 1rem;
    background: #2FA634;
    color: white;
    margin-top: 1rem;
    font-size: 1rem;
    border-radius: 10px;
}
</style>