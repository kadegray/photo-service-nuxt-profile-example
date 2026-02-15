<template>
  <div>
    <NuxtLink to="/terms" class="inline-flex items-center text-sm text-gray-400 hover:text-white mb-6 transition-colors">
      &larr; Back to Tags
    </NuxtLink>

    <div v-if="termLoading" class="text-center py-12 text-gray-400">Loading tag...</div>
    <div v-else-if="termError" class="text-center py-12 text-red-400">{{ termError.message }}</div>
    <template v-else-if="term">
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">{{ term.name }}</h1>
        <p v-if="term.description" class="text-gray-400 text-lg">{{ term.description }}</p>
        <div class="flex items-center gap-4 mt-2 text-sm text-gray-500">
          <span v-if="term.taxonomy">Category: {{ term.taxonomy.name }}</span>
          <span>{{ term.photo_count }} photos</span>
        </div>
      </div>

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
    </template>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const termId = route.params.id as string

const { term, loading: termLoading, error: termError } = useTerm(termId)
const { photos, loading: photosLoading, error: photosError, pagination: photosPagination, nextPage, prevPage } = useTermPhotos(termId)

useHead({
  title: 'Tag | Portfolio',
})
</script>
