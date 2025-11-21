import Header from '@/components/Header'
import { useTranslations } from 'next-intl'

function Wallets() {
  const t = useTranslations()

  return (
    <div>
      <Header title={t('wallet.title')} />
    </div>
  )
}

export default Wallets
