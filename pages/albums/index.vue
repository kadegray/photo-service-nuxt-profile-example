<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Albums</h1>

    <div v-if="loading" class="text-center py-12 text-gray-400">Loading albums...</div>
    <div v-else-if="error" class="text-center py-12 text-red-400">{{ error.message }}</div>
    <template v-else>
      <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="album in albums" :key="album.id">
          <NuxtLink :to="`/albums/${album.id}`" class="block group">
            <div class="rounded-lg overflow-hidden bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors">
              <div v-if="album.thumbnail_photos?.length" class="grid grid-cols-2 gap-0.5">
                <img
                  v-for="thumb in album.thumbnail_photos.slice(0, 4)"
                  :key="thumb.id"
                  :src="thumb.url"
                  :alt="album.name"
                  loading="lazy"
                  class="w-full aspect-square object-cover"
                />
              </div>
              <div v-else class="aspect-video bg-gray-800 flex items-center justify-center">
                <span class="text-gray-500">No photos</span>
              </div>
              <div class="p-4">
                <div class="flex items-center gap-2 mb-1">
                  <span
                    v-if="album.color"
                    class="w-3 h-3 rounded-full flex-shrink-0"
                    :style="{ backgroundColor: album.color }"
                  />
                  <h3 class="font-semibold text-white group-hover:text-gray-300 transition-colors truncate">
                    {{ album.name }}
                  </h3>
                </div>
                <p v-if="album.description" class="text-sm text-gray-400 line-clamp-2 mb-2">
                  {{ album.description }}
                </p>
                <p class="text-xs text-gray-500">{{ album.photo_count }} photos</p>
              </div>
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
const { albums, loading, error, pagination, nextPage, prevPage } = useAlbums()

useHead({
  title: 'Albums | Portfolio',
})
</script>
