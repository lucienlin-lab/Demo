import Header from '@/components/Header'
import { useTranslations } from 'next-intl'

function Profile() {
  const t = useTranslations()

  return (
    <div>
      <Header title={t('profile.title')} />
    </div>
  )
}

export default Profile
