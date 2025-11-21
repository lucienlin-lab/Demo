import { defineRouting } from 'next-intl/routing'

export const LOCALES = ['en', 'zh'] as const

export const routing = defineRouting({
  // A list of all locales that from config.ts file
  locales: LOCALES,
  // Used when no locale matches
  defaultLocale: LOCALES[0],
  localeDetection: true,
  localePrefix: 'as-needed'
})
