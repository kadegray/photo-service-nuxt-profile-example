<template>
  <div>
    <NuxtLink to="/" class="inline-flex items-center text-sm text-gray-400 hover:text-white mb-6 transition-colors">
      &larr; Back to Photos
    </NuxtLink>

    <div v-if="loading" class="text-center py-12 text-gray-400">Loading photo...</div>
    <div v-else-if="error" class="text-center py-12 text-red-400">{{ error.message }}</div>
    <div v-else-if="photo" class="space-y-8">
      <div class="rounded-lg overflow-hidden bg-gray-900">
        <img
          :src="photo.original.url"
          :alt="photo.original.filename"
          :width="photo.original.width"
          :height="photo.original.height"
          class="w-full h-auto"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-if="photo.original.exif" class="space-y-4">
          <h2 class="text-xl font-semibold">EXIF Data</h2>
          <dl class="grid grid-cols-2 gap-3 text-sm">
            <template v-if="photo.original.exif.camera_make">
              <dt class="text-gray-400">Camera</dt>
              <dd>{{ photo.original.exif.camera_make }} {{ photo.original.exif.camera_model }}</dd>
            </template>
            <template v-if="photo.original.exif.lens">
              <dt class="text-gray-400">Lens</dt>
              <dd>{{ photo.original.exif.lens }}</dd>
            </template>
            <template v-if="photo.original.exif.iso">
              <dt class="text-gray-400">ISO</dt>
              <dd>{{ photo.original.exif.iso }}</dd>
            </template>
            <template v-if="photo.original.exif.aperture">
              <dt class="text-gray-400">Aperture</dt>
              <dd>f/{{ photo.original.exif.aperture }}</dd>
            </template>
            <template v-if="photo.original.exif.shutter_speed">
              <dt class="text-gray-400">Shutter Speed</dt>
              <dd>{{ photo.original.exif.shutter_speed }}</dd>
            </template>
            <template v-if="photo.original.exif.focal_length">
              <dt class="text-gray-400">Focal Length</dt>
              <dd>{{ photo.original.exif.focal_length }}mm</dd>
            </template>
            <template v-if="photo.original.exif.taken_at">
              <dt class="text-gray-400">Taken</dt>
              <dd>{{ new Date(photo.original.exif.taken_at).toLocaleDateString() }}</dd>
            </template>
          </dl>
        </div>

        <div class="space-y-4">
          <h2 class="text-xl font-semibold">Details</h2>
          <dl class="grid grid-cols-2 gap-3 text-sm">
            <dt class="text-gray-400">Dimensions</dt>
            <dd>{{ photo.original.width }} &times; {{ photo.original.height }}</dd>
            <dt class="text-gray-400">File Size</dt>
            <dd>{{ (photo.original.file_size / 1024 / 1024).toFixed(2) }} MB</dd>
            <dt class="text-gray-400">Format</dt>
            <dd>{{ photo.original.mime_type }}</dd>
          </dl>
        </div>
      </div>

      <div v-if="photo.variants.length" class="space-y-4">
        <h2 class="text-xl font-semibold">Variants</h2>
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          <div v-for="variant in photo.variants" :key="variant.id" class="space-y-1">
            <div class="rounded overflow-hidden bg-gray-900">
              <img
                :src="variant.url"
                :alt="`${variant.width}x${variant.height}`"
                loading="lazy"
                class="w-full h-auto"
              />
            </div>
            <p class="text-xs text-gray-400 text-center">{{ variant.width }}&times;{{ variant.height }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const photoId = route.params.id as string
const { photo, loading, error } = usePhoto(photoId)

useHead({
  title: 'Photo Detail | Portfolio',
})
</script>
