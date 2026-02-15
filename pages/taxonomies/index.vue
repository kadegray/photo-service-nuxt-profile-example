<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Categories</h1>

    <div v-if="loading" class="text-center py-12 text-gray-400">Loading categories...</div>
    <div v-else-if="error" class="text-center py-12 text-red-400">{{ error.message }}</div>
    <template v-else>
      <div class="space-y-4">
        <NuxtLink
          v-for="taxonomy in taxonomies"
          :key="taxonomy.id"
          :to="`/taxonomies/${taxonomy.id}`"
          class="block p-4 rounded-lg bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors"
        >
          <h3 class="font-semibold text-white mb-1">{{ taxonomy.name }}</h3>
          <p v-if="taxonomy.description" class="text-sm text-gray-400 mb-2">{{ taxonomy.description }}</p>
          <p class="text-xs text-gray-500">{{ taxonomy.term_count }} terms</p>
        </NuxtLink>
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
const { taxonomies, loading, error, pagination, nextPage, prevPage } = useTaxonomies()

useHead({
  title: 'Categories | Portfolio',
})
</script>
