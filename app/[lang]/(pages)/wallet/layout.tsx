import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const t = await getTranslations({ locale: lang, namespace: 'wallet' })

  return {
    title: t('meta.title'),
    description: t('meta.description')
  }
}

function WalletsLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

export default WalletsLayout
