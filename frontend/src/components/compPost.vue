<template>
    <div class="post">
        <div class="post-header">
            <div class="profile">
                <img src="" alt="">
                <h4>Funkybird</h4>
                <p>@funckybird</p>
            </div>
            <div class="date">
                <img src="@/assets/Time_light.png" alt="">
                <p>26 May</p>
            </div>
        </div>
        <div class="post-text">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores suscipit modi voluptates
                quasi. Non totam accusantium consequatur ipsa quibusdam ad libero. Ipsa, ipsam tempora totam
                repellendus ab autem consequuntur quibusdam.</p>
        </div>
        <div class="image-content">
            <img src="@/assets/_add558a1-c25c-47a9-8a6e-67ca5f1dce1d.jpg" alt="">
        </div>
        <div class="post-actions">
            <comp-like-menu />
            <button><img src="@/assets/comment.png" alt=""></button>
            <button><img src="@/assets/share.png" alt=""></button>
        </div>
        <button class="post-footer">
            <div class="likes">
                <img src="@/assets/heart-fill.png" alt="">
                <span>1k</span>
            </div>
            <div class="comments">
                <span>12 Comments</span>
            </div>
        </button>
    </div>
</template>

<script setup>
import compLikeMenu from './compLikeMenu.vue';

const props = defineProps(['post'])
</script>

<style scoped>
.post {
    background: white;
    max-width: 600px;
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
    aspect-ratio: 1;
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

.post .post-footer img {
    height: 1rem;
}

@media screen and (max-width: 769px) {
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
