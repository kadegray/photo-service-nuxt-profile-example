<template>
  <div>
    <NuxtLink to="/taxonomies" class="inline-flex items-center text-sm text-gray-400 hover:text-white mb-6 transition-colors">
      &larr; Back to Taxonomies
    </NuxtLink>

    <nav v-if="allTaxonomies.length" class="flex flex-wrap gap-2 mb-8">
      <NuxtLink
        v-for="t in allTaxonomies"
        :key="t.id"
        :to="`/taxonomies/${t.id}`"
        class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
        :class="
          t.id === Number(taxonomyId)
            ? 'bg-white text-gray-950'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
        "
      >
        {{ t.name }}
      </NuxtLink>
    </nav>

    <div v-if="taxonomyError" class="text-center py-12 text-red-400">{{ taxonomyError.message }}</div>
    <template v-else>
      <div class="mb-8">
        <template v-if="taxonomyLoading">
          <div class="h-9 w-56 max-w-full rounded bg-gray-800 animate-pulse mb-2" />
          <div class="h-5 w-80 max-w-full rounded bg-gray-800 animate-pulse mb-2" />
          <div class="h-4 w-20 rounded bg-gray-800 animate-pulse mt-2" />
        </template>
        <template v-else-if="taxonomy">
          <h1 class="text-3xl font-bold mb-2">{{ taxonomy.name }}</h1>
          <p v-if="taxonomy.description" class="text-gray-400 text-lg">{{ taxonomy.description }}</p>
          <p class="text-sm text-gray-500 mt-2">{{ taxonomy.term_count }} terms</p>
        </template>
      </div>

      <div v-if="termsError" class="text-center py-12 text-red-400">{{ termsError.message }}</div>
      <template v-else>
        <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
          <template v-if="termsLoading">
            <EntityCardSkeleton v-for="n in 8" :key="`skeleton-${n}`" />
          </template>
          <template v-else>
            <EntityCard
              v-for="term in sortedTerms"
              :key="term.id"
              :to="`/terms/${term.id}`"
              :title="term.name"
              :description="term.description"
              :thumbnail-photos="term.thumbnail_photos"
              :stat="`${term.photo_count} photos`"
              hide-if-empty
            />
          </template>
        </div>

        <div v-if="termsPagination && termsPagination.last_page > 1" class="flex items-center justify-center gap-4 mt-8">
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
const { taxonomies: allTaxonomies } = useTaxonomies()
const { terms, loading: termsLoading, error: termsError, pagination: termsPagination, nextPage, prevPage } = useTaxonomyTerms(Number(taxonomyId))

const sortedTerms = computed(() => [...terms.value].sort((a, b) => b.photo_count - a.photo_count))

useHead({
  title: 'Taxonomy | Portfolio',
})
</script>
