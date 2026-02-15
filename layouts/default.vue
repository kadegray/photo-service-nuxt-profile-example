<template>
  <div class="min-h-screen bg-gray-950 text-gray-100">
    <header class="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <NuxtLink to="/" class="text-xl font-semibold tracking-tight text-white hover:text-gray-300 transition-colors">
            Portfolio
          </NuxtLink>
          <nav class="flex items-center space-x-8">
            <NuxtLink
              to="/"
              class="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              active-class="text-white"
            >
              Photos
            </NuxtLink>
            <NuxtLink
              to="/albums"
              class="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              active-class="text-white"
            >
              Albums
            </NuxtLink>
            <NuxtLink
              to="/taxonomies"
              class="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              active-class="text-white"
            >
              Taxonomies
            </NuxtLink>
            <NuxtLink
              to="/terms"
              class="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              active-class="text-white"
            >
              Tags
            </NuxtLink>
          </nav>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>

    <footer class="border-t border-gray-800 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-gray-500">
        &copy; {{ new Date().getFullYear() }} Portfolio. All rights reserved.
      </div>
    </footer>
  </div>
</template>
