<template>
    <div class="post-container">
        <transition name="fade" role="div" mode="in-out">
            <img src="@/assets/post_placeholder.png" class="placeholder" v-if="!post.media" alt="">
            <div class="post" v-else>
                <div class="post-header">
                    <router-link :to="`/profile/${post.uname}`" class="profile">
                        <img :src="post.propic" alt="">
                        <h4>{{ post.fname + " " + post.lname }}</h4>
                        <p>@{{ post.uname }}</p>
                    </router-link>
                    <div class="date">
                        <img src="@/assets/Time_light.png" alt="">
                        <p>{{ post.date }}</p>
                    </div>
                </div>
                <div class="post-text">
                    <pre>{{ post.content }}</pre>
                </div>
                <div class="image-content">
                    <img v-if="!post.m_type" :src="post.media" alt="">
                    <video v-else :src="post.media" controls></video>
                </div>
                <div class="post-actions">
                    <comp-like-menu v-if="post.id" :postId="post.id" @change="getPost" />
                    <button @click="viewComment"><img src="@/assets/comment.png" alt=""></button>
                    <button @click="sharePost"><img src="@/assets/share.png" alt=""></button>
                </div>
                <button class="post-footer" @click="viewComment">
                    <div class="likes" v-if="post.likeCount">
                        <div class="like-deck">
                            <p v-for="(type, index) in post.likeTypes.slice(0, 3)" :key="index">
                                {{ likes[type - 1] ? likes[type - 1].emoji : '' }}
                            </p>
                        </div>
                        <span>{{ post.likeCount }}</span>
                    </div>
                    <div class="comments">
                        <span>{{ post.commentCount }} comments</span>
                    </div>
                </button>
                <comp-comments v-if="showComment" :postId="post.id" @close="viewComment" @change="getPost" />
            </div>
        </transition>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref, computed } from 'vue';
import { useStore } from 'vuex';
import compLikeMenu from './compLikeMenu.vue';
import compComments from './compComments.vue'
import { useRouter } from 'vue-router';

const props = defineProps(['post'])
const post = ref({})
const store = useStore()
const router = useRouter()

const showComment = ref(false)
const viewComment = () => {
    showComment.value = !showComment.value
}
const likes = ref([
    {
        id: 1,
        name: 'like',
        emoji: '👍',
    },
    {
        id: 2,
        name: 'love',
        emoji: '❤️',
    },
    {
        id: 3,
        name: 'ha ha',
        emoji: '😄',
    },
    {
        id: 4,
        name: 'wow',
        emoji: '😲',
    },
    {
        id: 5,
        name: 'sad',
        emoji: '😢',
    },
    {
        id: 6,
        name: 'angry',
        emoji: '😡',
    },
])

const getPost = async () => {
    try {
        const res = await axios.get(`/post/get/${props.post.id}`)
        post.value = res.data
    }
    catch (err) {
        store.commit("addError", err.response.data.error)
    }
}

const sharePost = () => {
    router.push({
        name: "createPost",
        query: {
            post: JSON.stringify({
                content: post.value.content,
                url: post.value.media,
                uname: post.value.uname
            })
        }
    })
}

onMounted(async () => {
    await getPost()
})
</script>

<style scoped>
.post-container {
    position: relative;
}

.placeholder {
    width: 100%;
    min-width: 450px;
    max-width: 550px;
}

.post {
    background: white;
    min-width: 450px;
    max-width: 550px;
    width: 100%;
}

.post .post-header {
    display: flex;
    align-items: center;
    padding: 1rem;
}

.post .post-header .profile {
    display: grid;
    grid-column: 5rem auto;
    grid-row: 1fr 1fr;
    color: black;
    text-decoration: none;
}

.post .post-header .profile img {
    grid-column: 1;
    grid-row: 1/3;
    height: 4rem;
    width: 4rem;
    border-radius: 50%;
    border: 2px solid #2FA634;
    object-fit: cover;
}

.post .post-header .profile h4 {
    font-size: 1.2rem;
    grid-column: 2;
    grid-row: 1;
    margin-left: 0.75rem;
    margin-top: auto;
}

.post .post-header .profile p {
    font-size: 0.8rem;
    margin-left: 0.75rem;
    color: #555;
}

.post .post-header .date {
    display: flex;
    align-items: center;
    margin-left: auto;
    font-size: 0.9rem;
    color: #555;
}

.post .post-header .date img {
    height: 0.9rem;
    margin-right: 5px;
}

.post .post-text {
    padding: 1rem 1.5rem;
    font-weight: 300;
}

.post .image-content img {
    padding: 1rem 0 0;
    width: 100%;
    object-fit: contain;
}

.post .post-actions {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 1rem 1rem;
}

.post .post-actions button {
    background: none;
    border: none;
}

.post .post-actions button img {
    height: 1.5rem;
}

.post .post-footer {
    padding: 0.5rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: none;
    background: none;
    width: 100%;
    font-size: 1rem;
    border-top: 1px solid rgb(217, 217, 217);
}

.post .post-footer .likes {
    display: flex;
    align-items: center;
    gap: 5px;
}

.post .post-footer .likes .like-deck {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    transform: scaleX(-1);
}

.post .post-footer .likes .like-deck p {
    margin-right: -5px;
}

.post .post-footer .comments {
    margin-left: auto;
}

@media screen and (max-width: 769px) {
    .placeholder {
        min-width: auto;
    }

    .post {
        min-width: auto;
    }

    .post .post-header .profile img {
        height: 40px;
        width: 40px;
    }

    .post .post-header .profile h4 {
        font-size: 1rem;
    }

    .post .post-header .date {
        font-size: 0.8rem;
    }

    .post .post-text {
        font-size: 0.9rem;
    }

    .post .post-actions button img {
        height: 1.3rem;
    }

    .post .post-footer {
        font-size: 0.8rem;
    }

    .post .post-footer img {
        height: 0.8rem;
    }
}
</style>
