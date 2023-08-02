<template>
    <div class="dash">
        <div class="container">
            <div class="flex-box">
                <div class="post-deck">
                    <comp-post v-for="post in posts" :key="post.id" :post="post" />
                </div>
                <div class="comm-deck">
                    <div class="friends">
                        <h2>Friends</h2>
                        <router-link :to="`profile/${friend.user_name}`" class="profile" v-for="friend in friends"
                            :key="friend.user_name">
                            <img src="" alt="">
                            <h4>{{ friend.first_name + " " + friend.last_name }}</h4>
                            <p>@{{ friend.user_name }}</p>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import compPost from '@/components/compPost.vue';
import compComment from '@/components/compComment.vue';
import { onMounted, ref } from 'vue';

const posts = ref([])
const friends = ref([])

const getPosts = async () => {
    try {
        const result = await axios.get(`/post_feed/?u_id=${2}`);
        return result.data
    }
    catch (err) {
        console.log(err)
    }
}

const getFriends = async () => {
    try {
        const result = await axios.get(`/search_friend/?u_id=${2}`);
        console.log(result.data)
        return result.data
    }
    catch (err) {
        console.log(err)
    }
}

onMounted(async () => {
    posts.value = await getPosts()
    friends.value = await getFriends()
})

</script>

<style setup>
.dash {
    background: #ddd;
    min-height: calc(100vh - 4rem);
}

.post-deck {
    width: 60%;
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.comm-deck {
    position: fixed;
    right: 0;
    height: 100vh;
    width: 40%;
    min-width: 300px;
    padding: 2rem 1rem;
    background: white;
}

.friends h2 {
    margin-bottom: 2rem;
}

.friends .profile {
    display: grid;
    grid-template-columns: 3rem auto;
    grid-template-rows: 1fr 1fr;
    width: auto;
    margin: 1rem 0;
    text-decoration: none;
}

.friends .profile img {
    grid-column: 1;
    grid-row: 1/3;
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
    border: 2px solid #2FA634;
    object-fit: cover;
}

.friends .profile h4 {
    font-size: 1rem;
    grid-column: 2;
    grid-row: 1;
    margin-left: 0.75rem;
    margin-top: auto;
    color: black;
}

.friends .profile p {
    font-size: 0.8rem;
    margin-left: 0.75rem;
    color: #555;
}

@media screen and (max-width: 769px) {
    .post-deck {
        width: 100%;
    }

    .comm-deck {
        position: fixed;
    }
}
</style>