<script setup lang="ts">
defineEmits(["login"]);

const emailInput = ref();
const passwordInput = ref();
</script>

<template>
  <input
    v-model="emailInput"
    type="email"
    placeholder="email@example.com"
    class="rounded-lg bg-sky-500 p-2 text-slate-100 placeholder:text-slate-100 focus:outline-none"
  />

  <input
    v-model="passwordInput"
    type="password"
    placeholder="notpippo123"
    class="rounded-lg bg-sky-500 p-2 text-slate-100 placeholder:text-slate-100 focus:outline-none"
  />
  <button @click="$emit('login', { emailInput, passwordInput })">Log In</button>
</template>
