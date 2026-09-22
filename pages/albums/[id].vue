<template>
  <div>
    <NuxtLink to="/albums" class="inline-flex items-center text-sm text-gray-400 hover:text-white mb-6 transition-colors">
      &larr; Back to Albums
    </NuxtLink>

    <div v-if="albumError" class="text-center py-12 text-red-400">{{ albumError.message }}</div>
    <template v-else>
      <div class="space-y-8">
        <div>
          <template v-if="albumLoading">
            <div class="h-9 w-64 max-w-full rounded bg-gray-800 animate-pulse mb-2" />
            <div class="h-5 w-96 max-w-full rounded bg-gray-800 animate-pulse mb-2" />
            <div class="h-4 w-24 rounded bg-gray-800 animate-pulse mt-2" />
          </template>
          <template v-else-if="album">
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
          </template>
        </div>
      </div>

      <div class="mt-8">
        <div v-if="photosError" class="text-center py-12 text-red-400">{{ photosError.message }}</div>
        <PhotoGrid
          v-else
          :photos="allPhotos"
          :has-more="hasMorePhotos"
          :loading="photosLoading"
          @load-more="loadMorePhotos"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const albumId = route.params.id as string

const { album, loading: albumLoading, error: albumError } = useAlbum(albumId)
const { photos, loading: photosLoading, error: photosError, pagination: photosPagination, nextPage } = useAlbumPhotos(Number(albumId))

const allPhotos = ref<typeof photos.value>([])
const isAppending = ref(false)

watch(
  photos,
  (newPhotos) => {
    allPhotos.value = isAppending.value ? [...allPhotos.value, ...newPhotos] : newPhotos
    isAppending.value = false
  },
  { immediate: true, flush: 'sync' }
)

const hasMorePhotos = computed(
  () => !!photosPagination.value && photosPagination.value.current_page < photosPagination.value.last_page
)

function loadMorePhotos() {
  if (!photosLoading.value && hasMorePhotos.value) {
    isAppending.value = true
    nextPage()
  }
}

useHead({
  title: 'Album | Portfolio',
})
</script>
