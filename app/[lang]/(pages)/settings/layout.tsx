import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const t = await getTranslations({ locale: lang, namespace: 'setting' })

  return {
    title: t('meta.title'),
    description: t('meta.description')
  }
}

function SettingLayout({ children }: { children: React.ReactNode }) {
  return <div className="size-full">{children}</div>
}

export default SettingLayout
