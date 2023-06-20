<template>
    <div class="dash">
        <div class="container">
            <div class="flex-box">
                <div class="post-deck">
                    <comp-post />
                    <comp-post />
                    <comp-post />
                </div>
                <div class="comm-deck">
                    <comp-comment :comment="comment" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import compPost from '@/components/compPost.vue';
import compComment from '@/components/compComment.vue';
import { ref } from 'vue';

const comment = ref({
    name: "funkybird",
    content: "asdfsd kfhkj sdfads fasdf",
    no_likes: 12,
    time: "26 May",
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
    width: 40%;
    min-width: 300px;
    padding: 2rem 1rem;
    background: white;
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