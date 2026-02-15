# Photo Service Nuxt Portfolio Example

A demo portfolio site built with [Nuxt 3](https://nuxt.com) and [photo-service-vue](https://www.npmjs.com/package/photo-service-vue), showcasing how to integrate the photo-service-vue package into a Nuxt application.

## Features

- **Photos** — Browse and paginate through all photos, view full-size originals with EXIF data and image variants
- **Albums** — List albums with thumbnail previews, view album details and their photos
- **Taxonomies** — Browse category groupings and drill into their terms
- **Terms** — List tags across all taxonomies, view tagged photos

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-org/photo-service-nuxt-portfolio-example.git
   cd photo-service-nuxt-portfolio-example
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy the example environment file and update the values:

   ```bash
   cp .env.example .env
   ```

   | Variable | Description | Default |
   |---|---|---|
   | `PHOTO_SERVICE_BASE_URL` | URL of your Photo Service API | `https://photoservice.ibexel.com` |
   | `PHOTO_SERVICE_TENANT_ID` | Your tenant ID | `1` |

4. Start the development server:

   ```bash
   npm run dev
   ```

## Rendering Modes

This example supports all three Nuxt rendering modes. Edit `nuxt.config.ts` to switch:

**SSR (default)** — Server-side rendering, no extra config needed.

**SPA** — Single-page app:

```ts
export default defineNuxtConfig({
  ssr: false,
})
```

**SSG** — Static site generation:

```ts
export default defineNuxtConfig({
  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },
})
```

Then generate with:

```bash
npm run generate
```

## Composables Used

This project demonstrates the following composables provided by `photo-service-vue`:

| Composable | Page |
|---|---|
| `usePhotos()` | `pages/index.vue` |
| `usePhoto(id)` | `pages/photos/[id].vue` |
| `useAlbums()` | `pages/albums/index.vue` |
| `useAlbum(id)` | `pages/albums/[id].vue` |
| `useAlbumPhotos(id)` | `pages/albums/[id].vue` |
| `useTaxonomies()` | `pages/taxonomies/index.vue` |
| `useTaxonomy(id)` | `pages/taxonomies/[id].vue` |
| `useTaxonomyTerms(id)` | `pages/taxonomies/[id].vue` |
| `useTerms()` | `pages/terms/index.vue` |
| `useTerm(id)` | `pages/terms/[id].vue` |
| `useTermPhotos(id)` | `pages/terms/[id].vue` |

## License

[MIT](LICENSE)
