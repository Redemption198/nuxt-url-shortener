<script setup lang="ts">
import { URL } from "@prisma/client";

defineProps<{
  generatedUrls: URL[];
}>();

defineEmits(["deleteUrl", "toggleUrlActive"]);
</script>

<template>
  <div class="grid w-11/12 gap-4 md:grid-cols-2 xl:grid-cols-4">
    <div
      v-for="url in generatedUrls"
      :key="url.id"
      class="flex flex-col rounded-lg bg-neutral-50"
    >
      <div class="m-2 flex items-center justify-end gap-x-2">
        <p class="m-1 mr-auto text-center font-bold text-neutral-500">
          #{{ url.id }}
        </p>
        <p class="flex items-center gap-x-2 p-2.5 text-neutral-500">
          <Icon name="heroicons-solid:eye" class="h-4 w-4" />
          <span class="text-neutral-500">{{ url.visits }}</span>
        </p>
        <p class="flex items-center gap-x-2 p-2.5 text-neutral-500">
          <Icon name="heroicons:user-20-solid" class="h-4 w-4" />
          <span class="text-neutral-500">{{ url.userId }}</span>
        </p>
        <p class="flex items-center gap-x-2 text-neutral-500">
          {{ url.active ? "Active" : "Not Active" }}
          <Icon
            :name="url.active ? 'heroicons:check' : 'maki:cross-11'"
            class="h-4 w-4"
          />
        </p>
      </div>

      <div class="flex flex-col justify-between md:flex-row">
        <p class="flex flex-col p-2.5 text-xs text-neutral-500">
          Original URL
          <a
            :href="url.originalURL"
            class="text-sm text-neutral-600 underline underline-offset-2"
            >{{ url.originalURL }}</a
          >
        </p>

        <p class="flex flex-col p-2.5 text-xs text-neutral-500">
          Shorten URL
          <a
            :href="`http://localhost:3000/${url.shortenURL}`"
            class="text-sm text-neutral-600 underline underline-offset-2"
            >{{ `http://localhost:3000/${url.shortenURL}` }}</a
          >
        </p>
      </div>

      <div class="my-2 mt-auto grid grid-cols-2 place-items-center">
        <button
          class="rounded-lg p-2.5 text-sm font-bold text-red-300"
          @click="$emit('toggleUrlActive', { id: url.id, active: !url.active })"
        >
          {{ url.active ? "Deactivate" : "Activate" }}
        </button>
        <button
          class="rounded-lg p-2.5 text-sm font-bold text-red-300"
          @click="$emit('deleteUrl', url.id)"
        >
          DELETE
        </button>
      </div>
    </div>
  </div>
</template>
