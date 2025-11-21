import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const t = await getTranslations({ locale: lang, namespace: 'member' })

  return {
    title: t('meta.title'),
    description: t('meta.description')
  }
}

function MemberLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div>{children}</div>
}

export default MemberLayout
