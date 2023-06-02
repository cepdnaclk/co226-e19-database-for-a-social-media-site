<template>
  <div class="home">
    <compComment v-for="comment, index in comments" :key="index" :comment="comment" />
  </div>
</template>

<script setup>
import compComment from "@/components/compComment.vue";
import { ref } from "vue";

const comments = ref([
  {
    name: "Lorem",
    content: "hello there",
    no_likes: "1.2k",
    time: "1.5h"
  },
  {
    name: "Ipsum",
    content: "dskjhfak akjsdhf askjdfh askdfjh skdfj aksfd kasdfkaskfiweyrozjc",
    no_likes: "1k",
    time: "yesterday"
  },
  {
    name: "Ipsum",
    content: "dskjhfak akjsdhf askjdfh askdfjh skdfj",
    no_likes: "1k",
    time: "yesterday"
  }
])
</script>

<style></style>
