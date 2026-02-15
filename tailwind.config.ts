import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    // Include photo-service-vue components so Tailwind picks up ps- prefixed classes
    './node_modules/photo-service-vue/dist/**/*.{js,cjs}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
