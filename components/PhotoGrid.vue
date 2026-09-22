<template>
  <div>
    <div
      ref="gridEl"
      class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4"
      style="grid-auto-rows: 8px"
    >
      <div v-for="photo in photos" :key="photo.id" :style="{ gridRowEnd: `span ${spans[photo.id] ?? 1}` }">
        <NuxtLink :to="`/photos/${photo.photo_id}`" class="block group h-full">
          <div class="overflow-hidden rounded-lg bg-gray-900 h-full relative">
            <div v-if="!loadedIds.has(photo.id)" class="absolute inset-0 bg-gray-800 animate-pulse" />
            <img
              :src="photo.url"
              :alt="photo.filename"
              :width="photo.width"
              :height="photo.height"
              loading="lazy"
              class="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
              :class="loadedIds.has(photo.id) ? 'opacity-100' : 'opacity-0'"
              @load="markLoaded(photo.id)"
              @error="markLoaded(photo.id)"
            />
          </div>
        </NuxtLink>
      </div>

      <template v-if="loading">
        <div
          v-for="n in skeletonCount"
          :key="`skeleton-${n}`"
          class="rounded-lg bg-gray-800 animate-pulse"
          :style="{ gridRowEnd: `span ${currentLandscapeSpan}` }"
        />
      </template>
    </div>

    <div ref="sentinel" />
  </div>
</template>

<script setup lang="ts">
interface Photo {
  id: string
  photo_id: string
  url: string
  filename: string
  width: number
  height: number
}

const props = defineProps<{
  photos: Photo[]
  hasMore?: boolean
  loading?: boolean
}>()

const emit = defineEmits<{
  'load-more': []
}>()

const ROW_UNIT = 8
const GAP = 16
const FALLBACK_COLUMN_WIDTH = 300
const INITIAL_SKELETON_COUNT = 12
const LOAD_MORE_SKELETON_COUNT = 4

const skeletonCount = computed(() => (props.photos.length === 0 ? INITIAL_SKELETON_COUNT : LOAD_MORE_SKELETON_COUNT))

function isPortrait(photo: Photo) {
  return photo.height > photo.width
}

function landscapeSpanFor(columnWidth: number) {
  const landscapeHeight = columnWidth * (3 / 4)
  return Math.max(1, Math.round((landscapeHeight + GAP) / (ROW_UNIT + GAP)))
}

const gridEl = ref<HTMLElement | null>(null)
const loadedIds = reactive(new Set<string>())

function markLoaded(id: string) {
  loadedIds.add(id)
}

function computeSpans(columnWidth: number) {
  const landscapeSpan = landscapeSpanFor(columnWidth)
  const next: Record<string, number> = {}
  for (const photo of props.photos) {
    next[photo.id] = isPortrait(photo) ? landscapeSpan * 2 : landscapeSpan
  }
  return next
}

const spans = ref<Record<string, number>>(computeSpans(FALLBACK_COLUMN_WIDTH))
const currentLandscapeSpan = ref(landscapeSpanFor(FALLBACK_COLUMN_WIDTH))

function recomputeSpans() {
  const el = gridEl.value
  if (!el) return
  const style = getComputedStyle(el)
  const columns = style.gridTemplateColumns.split(' ').filter(Boolean).length
  if (!columns) return
  const columnGap = parseFloat(style.columnGap) || 0
  const columnWidth = (el.clientWidth - columnGap * (columns - 1)) / columns
  if (!columnWidth || columnWidth <= 0) return
  spans.value = computeSpans(columnWidth)
  currentLandscapeSpan.value = landscapeSpanFor(columnWidth)
}

let resizeObserver: ResizeObserver | null = null

watch(() => props.photos, recomputeSpans)

const sentinel = ref<HTMLElement | null>(null)
let intersectionObserver: IntersectionObserver | null = null

onMounted(() => {
  recomputeSpans()

  if (gridEl.value) {
    resizeObserver = new ResizeObserver(() => recomputeSpans())
    resizeObserver.observe(gridEl.value)
  }

  intersectionObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting && props.hasMore && !props.loading) {
        emit('load-more')
      }
    },
    { rootMargin: '400px' }
  )
  if (sentinel.value) intersectionObserver.observe(sentinel.value)
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
})
</script>
