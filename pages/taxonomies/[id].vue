<template>
  <div>
    <NuxtLink to="/taxonomies" class="inline-flex items-center text-sm text-gray-400 hover:text-white mb-6 transition-colors">
      &larr; Back to Categories
    </NuxtLink>

    <div v-if="taxonomyLoading" class="text-center py-12 text-gray-400">Loading category...</div>
    <div v-else-if="taxonomyError" class="text-center py-12 text-red-400">{{ taxonomyError.message }}</div>
    <template v-else-if="taxonomy">
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">{{ taxonomy.name }}</h1>
        <p v-if="taxonomy.description" class="text-gray-400 text-lg">{{ taxonomy.description }}</p>
        <p class="text-sm text-gray-500 mt-2">{{ taxonomy.term_count }} terms</p>
      </div>

      <div v-if="termsLoading" class="text-center py-12 text-gray-400">Loading terms...</div>
      <div v-else-if="termsError" class="text-center py-12 text-red-400">{{ termsError.message }}</div>
      <template v-else>
        <div class="space-y-4">
          <NuxtLink
            v-for="term in terms"
            :key="term.id"
            :to="`/terms/${term.id}`"
            class="block p-4 rounded-lg bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors"
          >
            <h3 class="font-semibold text-white mb-1">{{ term.name }}</h3>
            <p v-if="term.description" class="text-sm text-gray-400 mb-2">{{ term.description }}</p>
            <p class="text-xs text-gray-500">{{ term.photo_count }} photos</p>
          </NuxtLink>
        </div>

        <div v-if="termsPagination" class="flex items-center justify-center gap-4 mt-8">
          <button @click="prevPage" :disabled="termsPagination.current_page <= 1" class="px-4 py-2 rounded bg-gray-800 text-white disabled:opacity-50">Previous</button>
          <span class="text-gray-400">Page {{ termsPagination.current_page }} of {{ termsPagination.last_page }}</span>
          <button @click="nextPage" :disabled="termsPagination.current_page >= termsPagination.last_page" class="px-4 py-2 rounded bg-gray-800 text-white disabled:opacity-50">Next</button>
        </div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const taxonomyId = route.params.id as string

const { taxonomy, loading: taxonomyLoading, error: taxonomyError } = useTaxonomy(taxonomyId)
const { terms, loading: termsLoading, error: termsError, pagination: termsPagination, nextPage, prevPage } = useTaxonomyTerms(Number(taxonomyId))

useHead({
  title: 'Category | Portfolio',
})
</script>
