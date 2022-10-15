<script setup>
const urlInput = ref();

const shortenUrl = ref();

async function sendRequest() {
  const response = await $fetch("/api/urls", {
    body: {
      url: urlInput.value,
    },
    method: "POST",
  });

  shortenUrl.value = response;
}
</script>

<template>
  <div>
    <input v-model="urlInput" type="url" placeholder="URL to shorten" />
    <button @click="sendRequest">Submit</button>

    <p>{{ shortenUrl }}</p>
  </div>
</template>
