<template>
  <NuxtLink v-if="!hideIfEmpty || thumbnailPhotos?.length" :to="to" class="block group">
    <div class="rounded-lg overflow-hidden bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors">
      <div v-if="thumbnailPhotos?.length === 1" class="aspect-square">
        <img
          :src="thumbnailPhotos[0].url"
          :alt="title"
          loading="lazy"
          class="w-full h-full object-cover"
        />
      </div>
      <div v-else-if="thumbnailPhotos?.length === 2" class="grid grid-cols-2 gap-0.5 aspect-square">
        <img
          v-for="thumb in thumbnailPhotos"
          :key="thumb.id"
          :src="thumb.url"
          :alt="title"
          loading="lazy"
          class="w-full h-full object-cover"
        />
      </div>
      <div v-else-if="thumbnailPhotos?.length === 3" class="grid grid-cols-2 grid-rows-2 gap-0.5 aspect-square">
        <img
          :src="thumbnailPhotos[0].url"
          :alt="title"
          loading="lazy"
          class="row-span-2 w-full h-full object-cover"
        />
        <img
          :src="thumbnailPhotos[1].url"
          :alt="title"
          loading="lazy"
          class="w-full h-full object-cover"
        />
        <img
          :src="thumbnailPhotos[2].url"
          :alt="title"
          loading="lazy"
          class="w-full h-full object-cover"
        />
      </div>
      <div v-else-if="thumbnailPhotos?.length" class="grid grid-cols-2 grid-rows-2 gap-0.5 aspect-square">
        <img
          v-for="thumb in thumbnailPhotos.slice(0, 4)"
          :key="thumb.id"
          :src="thumb.url"
          :alt="title"
          loading="lazy"
          class="w-full h-full object-cover"
        />
      </div>
      <div v-else class="aspect-square bg-gray-800 flex items-center justify-center">
        <span class="text-gray-500">No photos</span>
      </div>
      <div class="p-4">
        <div class="flex items-center gap-2 mb-1">
          <span
            v-if="color"
            class="w-3 h-3 rounded-full flex-shrink-0"
            :style="{ backgroundColor: color }"
          />
          <h3 class="font-semibold text-white group-hover:text-gray-300 transition-colors truncate">
            {{ title }}
          </h3>
        </div>
        <p v-if="subtitle" class="text-xs text-gray-500 mb-1">{{ subtitle }}</p>
        <p v-if="description" class="text-sm text-gray-400 line-clamp-2 mb-2">{{ description }}</p>
        <p class="text-xs text-gray-500">{{ stat }}</p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
interface ThumbnailPhoto {
  id: string
  url: string
}

defineProps<{
  to: string
  title: string
  stat: string
  thumbnailPhotos?: ThumbnailPhoto[]
  subtitle?: string | null
  description?: string | null
  color?: string | null
  hideIfEmpty?: boolean
}>()
</script>
