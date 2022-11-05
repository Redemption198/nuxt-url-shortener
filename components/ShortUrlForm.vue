<script setup lang="ts">
defineProps({
  shortenUrl: String,
});

defineEmits(["createUrl"]);

const urlInput = ref();
</script>

<template>
  <div class="flex w-11/12 flex-col gap-y-6 rounded-xl bg-sky-400 p-4 lg:w-1/3">
    <p class="text-center font-bold text-slate-100">URL to Shorten</p>
    <input
      v-model="urlInput"
      type="url"
      placeholder="https://example.com"
      class="rounded-lg bg-sky-500 p-2 text-slate-100 placeholder:text-slate-100 focus:outline-none"
    />

    <div
      v-if="shortenUrl"
      class="rounded-lg bg-sky-500 p-2 text-center transition"
    >
      <p class="font-semibold text-slate-100">Your shorten URL</p>
      <a
        class="text-slate-100 underline underline-offset-2"
        :href="shortenUrl"
        >{{ shortenUrl }}</a
      >
    </div>
    <button
      class="rounded-lg bg-sky-50 p-2 text-lg font-bold text-sky-400 transition-transform duration-200 hover:scale-95"
      @click="$emit('createUrl', urlInput)"
    >
      Shorten
    </button>
  </div>
</template>
