<script setup>
const urlInput = ref();

const shortenUrl = ref();

const { data: generatedUrls, refresh: refreshUrls } = useLazyFetch("/api/urls");

async function createUrl() {
  const response = await $fetch("/api/urls", {
    body: {
      url: urlInput.value,
    },
    method: "POST",
  });

  shortenUrl.value = response;
  refreshUrls();
}

async function deleteUrl(id) {
  await $fetch("/api/urls", {
    body: {
      id,
    },
    method: "DELETE",
  });

  refreshUrls();
}
</script>

<template>
  <div
    class="flex min-h-screen w-screen flex-col items-center justify-center gap-y-8"
  >
    <div class="flex w-1/3 flex-col gap-y-6 rounded-xl bg-sky-400 p-4">
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
        @click="createUrl"
      >
        Shorten
      </button>
    </div>

    <table class="table-fixed overflow-hidden rounded-lg">
      <tr>
        <th class="bg-sky-200 p-1 font-bold">ID</th>
        <th class="bg-sky-200 p-1 font-bold">OriginalURL</th>
        <th class="bg-sky-200 p-1 font-bold">ShortenURL</th>
        <th class="bg-sky-200 p-1 font-bold">Active</th>
        <th class="bg-sky-200 p-1 font-bold">UserId</th>
        <th class="bg-sky-200 p-1 font-bold">Actions</th>
      </tr>
      <tr
        v-for="url in generatedUrls"
        :key="url.id"
        class="bg-sky-300 p-4 even:bg-sky-400"
      >
        <td class="p-2.5">{{ url.id }}</td>
        <td class="p-2.5">
          <a :href="url.originalURL" class="underline underline-offset-2">{{
            url.originalURL
          }}</a>
        </td>
        <td class="p-2.5">
          <a
            :href="`http://localhost:3000/s/${url.shortenURL}`"
            class="underline underline-offset-2"
            >{{ `http://localhost:3000/s/${url.shortenURL}` }}</a
          >
        </td>
        <td class="p-2.5">{{ url.active }}</td>
        <td class="p-2.5">{{ url.userId }}</td>
        <td class="p-2.5">
          <button
            class="rounded-lg bg-red-400 p-1 text-sm font-bold text-slate-100"
            @click="deleteUrl(url.id)"
          >
            DELETE
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>
