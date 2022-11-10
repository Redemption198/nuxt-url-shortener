<script setup lang="ts">
defineEmits(["login"]);

const emailInput = ref();
const passwordInput = ref();
</script>

<template>
  <p class="text-xl font-bold text-neutral-50">Nuxt Url Shortener</p>
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
  <button
    class="rounded-lg bg-sky-50 p-2 font-bold text-sky-400 transition-transform duration-200 hover:scale-95"
    @click="$emit('login', { emailInput, passwordInput })"
  >
    Log In
  </button>
</template>
