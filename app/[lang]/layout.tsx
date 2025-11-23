import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { Geist, Geist_Mono } from 'next/font/google'
import { getMessages, getTranslations } from 'next-intl/server'
import tenantConfig from '@tenant-config'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const t = await getTranslations({ locale: lang, namespace: 'meta' })

  // Read keys from tenant config or use defaults
  const titleKey = tenantConfig.meta.titleKey || 'root.title'
  const descriptionKey = tenantConfig.meta.descriptionKey || 'root.description'
  const keywordsKey = tenantConfig.meta.keywordsKey || 'root.keywords'

  const title = t(titleKey)
  const description = t(descriptionKey)

  return {
    title: {
      default: title,
      template: `%s | ${title}`
    },
    description: description,
    keywords: t(keywordsKey),
    openGraph: {
      title: title,
      description: description,
      type: 'website',
      locale: lang === 'zh' ? 'zh_TW' : 'en_US',
      siteName: title
    }
  }
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params
  const messages = await getMessages() // For Client Components using i18n

  return (
    <html lang={lang}>
      <body
        data-theme={tenantConfig.theme}
        className={`${geistSans.variable} ${geistMono.variable} bg-lower-layer-bg h-full w-full antialiased`}
      >
        <div className="bg-primary-bg mx-auto flex h-screen w-full items-center justify-center shadow-lg lg:max-w-5xl">
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  )
}
