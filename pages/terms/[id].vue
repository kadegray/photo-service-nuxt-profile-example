<template>
  <div>
    <NuxtLink :to="backLink" class="inline-flex items-center text-sm text-gray-400 hover:text-white mb-6 transition-colors">
      &larr; {{ backLabel }}
    </NuxtLink>

    <div v-if="termError" class="text-center py-12 text-red-400">{{ termError.message }}</div>
    <template v-else>
      <div class="mb-8">
        <template v-if="termLoading">
          <div class="h-9 w-56 max-w-full rounded bg-gray-800 animate-pulse mb-2" />
          <div class="h-5 w-80 max-w-full rounded bg-gray-800 animate-pulse mb-2" />
          <div class="h-4 w-32 rounded bg-gray-800 animate-pulse mt-2" />
        </template>
        <template v-else-if="term">
          <h1 class="text-3xl font-bold mb-2">{{ term.name }}</h1>
          <p v-if="term.description" class="text-gray-400 text-lg">{{ term.description }}</p>
          <div class="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span v-if="term.taxonomy">Taxonomy: {{ term.taxonomy.name }}</span>
            <span>{{ term.photo_count }} photos</span>
          </div>
        </template>
      </div>

      <div v-if="photosError" class="text-center py-12 text-red-400">{{ photosError.message }}</div>
      <PhotoGrid
        v-else
        :photos="allPhotos"
        :has-more="hasMorePhotos"
        :loading="photosLoading"
        @load-more="loadMorePhotos"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const termId = route.params.id as string

const { term, loading: termLoading, error: termError } = useTerm(termId)

const backLink = computed(() => (term.value?.taxonomy ? `/taxonomies/${term.value.taxonomy.id}` : '/taxonomies'))
const backLabel = computed(() => (term.value?.taxonomy ? `Back to ${term.value.taxonomy.name}` : 'Back to Taxonomies'))
const { photos, loading: photosLoading, error: photosError, pagination: photosPagination, nextPage } = useTermPhotos(termId)

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
  title: 'Tag | Portfolio',
})
</script>
