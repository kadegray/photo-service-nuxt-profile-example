<template>
  <div>
    <NuxtLink to="/albums" class="inline-flex items-center text-sm text-gray-400 hover:text-white mb-6 transition-colors">
      &larr; Back to Albums
    </NuxtLink>

    <div v-if="albumLoading" class="text-center py-12 text-gray-400">Loading album...</div>
    <div v-else-if="albumError" class="text-center py-12 text-red-400">{{ albumError.message }}</div>
    <template v-else-if="album">
      <div class="space-y-8">
        <div>
          <div class="flex items-center gap-3 mb-2">
            <span
              v-if="album.color"
              class="w-4 h-4 rounded-full flex-shrink-0"
              :style="{ backgroundColor: album.color }"
            />
            <h1 class="text-3xl font-bold">{{ album.name }}</h1>
          </div>
          <p v-if="album.description" class="text-gray-400 text-lg">{{ album.description }}</p>
          <p class="text-sm text-gray-500 mt-2">{{ album.photo_count }} photos</p>
        </div>
      </div>

      <div class="mt-8">
        <div v-if="photosLoading" class="text-center py-12 text-gray-400">Loading photos...</div>
        <div v-else-if="photosError" class="text-center py-12 text-red-400">{{ photosError.message }}</div>
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

          <div v-if="photosPagination" class="flex items-center justify-center gap-4 mt-8">
            <button @click="prevPage" :disabled="photosPagination.current_page <= 1" class="px-4 py-2 rounded bg-gray-800 text-white disabled:opacity-50">Previous</button>
            <span class="text-gray-400">Page {{ photosPagination.current_page }} of {{ photosPagination.last_page }}</span>
            <button @click="nextPage" :disabled="photosPagination.current_page >= photosPagination.last_page" class="px-4 py-2 rounded bg-gray-800 text-white disabled:opacity-50">Next</button>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const albumId = route.params.id as string

const { album, loading: albumLoading, error: albumError } = useAlbum(albumId)
const { photos, loading: photosLoading, error: photosError, pagination: photosPagination, nextPage, prevPage } = useAlbumPhotos(Number(albumId))

useHead({
  title: 'Album | Portfolio',
})
</script>
