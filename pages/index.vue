<script setup>
const shortenUrl = ref();

const {
  data: generatedUrls,
  refresh: refreshUrls,
  error,
} = useLazyFetch("/api/urls", {
  server: false,
  onResponseError: async () => {
    await $fetch("/api/auth/refresh");

    refreshUrls();
  },
});

async function createUrl(url) {
  const response = await $fetch("/api/urls", {
    body: {
      url,
    },
    method: "POST",
    onResponseError: async () => {
      await $fetch("/api/auth/refresh");

      refreshUrls();
    },
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
    onResponseError: async () => {
      await $fetch("/api/auth/refresh");

      refreshUrls();
    },
  });

  refreshUrls();
}

async function toggleUrlActive({ id, active }) {
  await $fetch("/api/urls", {
    body: {
      id,
      active,
    },
    method: "PUT",
    onResponseError: async () => {
      await $fetch("/api/auth/refresh");

      refreshUrls();
    },
  });

  refreshUrls();
}

async function login({ emailInput, passwordInput }) {
  await $fetch("/api/auth/login", {
    body: {
      email: emailInput,
      password: passwordInput,
    },
    method: "POST",
  });

  refreshUrls();
}
async function logout() {
  await $fetch("/api/auth/logout");

  refreshUrls();
}
</script>

<template>
  <div
    class="flex min-h-screen w-screen flex-col items-center justify-center gap-y-8"
  >
    <button
      v-if="generatedUrls && !error"
      class="rounded-lg bg-sky-50 p-2 font-bold text-sky-400 transition-transform duration-200 hover:scale-95"
      @click="logout"
    >
      Logout
    </button>

    <LoginForm v-if="!generatedUrls && error" @login="login" />

    <LazyShortUrlForm
      v-if="!error"
      :shorten-url="shortenUrl"
      @create-url="createUrl"
    />

    <LazyGridUrls
      v-if="!error && generatedUrls && generatedUrls.length > 0"
      :generated-urls="generatedUrls"
      @delete-url="deleteUrl"
      @toggle-url-active="toggleUrlActive"
    />
  </div>
</template>
