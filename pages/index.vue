<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Photos</h1>

    <div v-if="loading" class="text-center py-12 text-gray-400">Loading photos...</div>
    <div v-else-if="error" class="text-center py-12 text-red-400">{{ error.message }}</div>
    <template v-else>
      <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
        <div v-for="photo in photos" :key="photo.id">
          <NuxtLink :to="`/photos/${photo.photo_id}`" class="block group">
            <div class="overflow-hidden rounded-lg bg-gray-900">
              <img
                :src="photo.url"
                :alt="photo.filename"
                :width="photo.width"
                :height="photo.height"
                loading="lazy"
                class="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </NuxtLink>
        </div>
      </div>

      <div v-if="pagination" class="flex items-center justify-center gap-4 mt-8">
        <button @click="prevPage" :disabled="pagination.current_page <= 1" class="px-4 py-2 rounded bg-gray-800 text-white disabled:opacity-50">Previous</button>
        <span class="text-gray-400">Page {{ pagination.current_page }} of {{ pagination.last_page }}</span>
        <button @click="nextPage" :disabled="pagination.current_page >= pagination.last_page" class="px-4 py-2 rounded bg-gray-800 text-white disabled:opacity-50">Next</button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const { photos, loading, error, pagination, nextPage, prevPage } = usePhotos()

useHead({
  title: 'Photos | Portfolio',
})
</script>
