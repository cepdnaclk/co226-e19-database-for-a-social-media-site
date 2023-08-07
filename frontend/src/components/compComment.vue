<template>
    <div class="comment">
        <div class="prof-pic">
            <img :src="props.comment.propic" alt="" />
        </div>
        <div class="com">
            <h5><router-link :to="`/profile/${props.comment.uname}`">{{ props.comment.fname }} {{
                props.comment.lname }}</router-link></h5>
            <p>
                {{ props.comment.content }}
            </p>
            <div class="footer">
                <p>{{ props.comment.no_likes }}</p>
                <comp-com-like-menu />
                <p>{{ props.comment.date }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from "vue";
import compComLikeMenu from "./compComLikeMenu.vue";

const props = defineProps(['comment']);

</script>

<style scoped>
.comment {
    position: relative;
    border-radius: 1rem;
    background: #e3ebe2;
    width: fit-content;
    margin-left: 30px;
    width: 80%;
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
}

.comment .prof-pic img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.comment .com {
    width: 100%;
    text-align: left;
    padding: 1rem 1.5rem;
    padding-left: 40px;
    min-width: 250px;
}

.comment .com h5 a {
    text-decoration: none;
    font-family: "Raleway", sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    color: #011502;
}

.comment .com p {
    margin-top: 7px;
    font-weight: 400;
    font-size: 0.9rem;
    word-wrap: break-word;
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
