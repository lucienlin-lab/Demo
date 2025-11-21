import Header from '@/components/Header'
import { useTranslations } from 'next-intl'

function Member() {
  const t = useTranslations()

  return (
    <div>
      <Header title={t('member.title')} />
    </div>
  )
}

export default Member
