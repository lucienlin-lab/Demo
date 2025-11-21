import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { routing, LOCALES } from './routing'

const MODULES = [
  'home',
  'member',
  'profile',
  'setting',
  'wallet',
  'meta'
] as const

const getDictionary = async (locale: (typeof LOCALES)[number]) => {
  const messages: Record<string, any> = {}

  // Integrate all dictionaries in one
  for (const module of MODULES) {
    try {
      messages[module] = (
        await import(`./dictionaries/${locale}/${module}.json`)
      ).default
    } catch (error) {
      console.warn(`Failed to load ${module} for ${locale}`)
    }
  }

  return messages
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale

  return {
    locale,
    messages: await getDictionary(locale as (typeof LOCALES)[number])
  }
})
