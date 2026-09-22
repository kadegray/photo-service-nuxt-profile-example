<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Albums</h1>

    <div v-if="error" class="text-center py-12 text-red-400">{{ error.message }}</div>
    <template v-else>
      <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
        <template v-if="loading">
          <EntityCardSkeleton v-for="n in 8" :key="`skeleton-${n}`" />
        </template>
        <template v-else>
          <EntityCard
            v-for="album in albums"
            :key="album.id"
            :to="`/albums/${album.id}`"
            :title="album.name"
            :description="album.description"
            :thumbnail-photos="album.thumbnail_photos"
            :color="album.color"
            :stat="`${album.photo_count} photos`"
            hide-if-empty
          />
        </template>
      </div>

      <div v-if="pagination && pagination.last_page > 1" class="flex items-center justify-center gap-4 mt-8">
        <button @click="prevPage" :disabled="pagination.current_page <= 1" class="px-4 py-2 rounded bg-gray-800 text-white disabled:opacity-50">Previous</button>
        <span class="text-gray-400">Page {{ pagination.current_page }} of {{ pagination.last_page }}</span>
        <button @click="nextPage" :disabled="pagination.current_page >= pagination.last_page" class="px-4 py-2 rounded bg-gray-800 text-white disabled:opacity-50">Next</button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const { albums, loading, error, pagination, nextPage, prevPage } = useAlbums({
  sort_by: 'name',
  sort_direction: 'desc',
})

useHead({
  title: 'Albums | Portfolio',
})
</script>
