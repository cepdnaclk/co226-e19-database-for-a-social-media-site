<template>
    <div class="comment">
        <div class="prof-pic">
            <img src="@/assets/logo.png" alt="" />
        </div>
        <div class="com">
            <h5><router-link to="">{{ props.comment.name }}</router-link></h5>
            <p>
                {{ props.comment.content }}
            </p>
            <div class="footer">
                <p>{{ props.comment.no_likes }}</p>
                <button>Like</button>
                <button>Reply</button>
                <p>{{ props.comment.time }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps(['comment']);

</script>

<style scoped>
.comment {
    position: relative;
    border-radius: 1rem;
    background: #e3ebe2;
    width: fit-content;
    margin-left: 30px;
}

.comment .prof-pic {
    position: absolute;
    left: 0%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    height: 50px;
    width: 50px;
    background: white;
    border: 3px solid #35495e;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 2px;
}

.comment .prof-pic img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.comment .com {
    width: fit-content;
    text-align: left;
    padding: 1rem 1.5rem;
    padding-left: 40px;
    min-width: 250px;
}

.comment .com h5 a {
    text-decoration: none;
    font-family: "Raleway", sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    color: #011502;
}

.comment .com p {
    margin-top: 5px;
    font-weight: 400;
    font-size: 0.9rem;
}

.comment .footer {
    display: flex;
    align-items: center;
    justify-content: right;
    margin-top: 10px;
    color: #011502;
}

.comment .com .footer p {
    margin: 0;
    font-size: 0.8rem;
}

.comment .com .footer p:first-child {
    margin-right: auto;
}

.comment .com .footer button {
    background: none;
    border: none;
    font-size: 0.8rem;
    margin-right: 20px;
    cursor: pointer;
}
</style>
