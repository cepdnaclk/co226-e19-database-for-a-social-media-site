<template>
  <router-view />
</template>

<style>
.container {
  width: clamp(300px, 90%, 1280px);
  margin: auto;
}

input[type="text"],
input[type="password"],
input[type="email"] {
  display: block;
  padding: 0.5em 1em;
  border: none;
  margin: 0.5em 0;
  background: #eef;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 300;
}
</style>
