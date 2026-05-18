import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import { storyblok } from '@storyblok/astro'
import { loadEnv } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import netlify from '@astrojs/netlify'

const env = loadEnv('', process.cwd(), 'STORYBLOK')

let is_preview = env.STORYBLOK_IS_PREVIEW === 'yes'
let output
let adapter

// local dev
if (import.meta.env.DEV) {
  output = "server"
  adapter = undefined
}

// local build
else if (env.STORYBLOK_ENVIRONMENT === 'development') {
  output = "static"
  adapter = undefined
  is_preview = false
}

// cloud
else {
  adapter = is_preview ? netlify() : undefined
  output = is_preview ? "server" : "static"
}

export default defineConfig({
  output: output,
  adapter: adapter,

  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      components: {
        page: 'storyblok/Page',
        report: 'storyblok/Report',
        'par-mani': 'storyblok/ParMani',
        hero: 'storyblok/Hero',
        reports_section: 'storyblok/ReportsSection',
        reports_list: 'storyblok/ReportsList',
        features_section: 'storyblok/FeaturesSection',
        stats_section: 'storyblok/StatsSection',
        testimonials_section: 'storyblok/TestimonialsSection',
        team_section: 'storyblok/TeamSection',
        partners_section: 'storyblok/PartnersSection',
        advisers_section: 'storyblok/AdvisersSection',
        banner_cta: 'storyblok/BannerCta',
        banner_split: 'storyblok/BannerSplit',
        heading: 'storyblok/Heading',
        button: 'storyblok/Button',
      },
      bridge: {
        resolveRelations: ['reports_section.reports'],
      },
      enableFallbackComponent: true,
      livePreview: is_preview,
      apiOptions: {
        region: 'eu',
      },
    }),
  ],

  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
      },
    ],
  },

  vite: {
    plugins: [
      mkcert(),
      tailwindcss()
    ],
    server: {
      https: true,
    },
  }
})
