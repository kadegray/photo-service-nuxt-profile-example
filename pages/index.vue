<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold">Photos</h1>
      <label class="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
        <input
          type="checkbox"
          v-model="highlightedOnly"
          class="w-4 h-4 rounded border-gray-700 bg-gray-800 accent-white"
        />
        Highlighted only
      </label>
    </div>

    <div v-if="error" class="text-center py-12 text-red-400">{{ error.message }}</div>
    <PhotoGrid
      v-else
      :photos="allPhotos"
      :has-more="hasMorePhotos"
      :loading="loading"
      @load-more="loadMorePhotos"
    />
  </div>
</template>

<script setup lang="ts">
const highlightedOnly = ref(false)
const filters = computed(() => (highlightedOnly.value ? { highlighted: 1 as const } : {}))

const { photos, loading, error, pagination, nextPage } = usePhotos(filters)

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
  () => !!pagination.value && pagination.value.current_page < pagination.value.last_page
)

function loadMorePhotos() {
  if (!loading.value && hasMorePhotos.value) {
    isAppending.value = true
    nextPage()
  }
}

useHead({
  title: 'Photos | Portfolio',
})
</script>
