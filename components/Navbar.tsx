import {
  HomeIcon,
  SettingsIcon,
  WalletIcon,
  UserCircle2Icon,
  Users2Icon
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import tenantConfig from '@tenant-config'
import { cn } from '@/lib/utils'

function Navbar() {
  const t = useTranslations()
  const { valid_page } = tenantConfig

  return (
    <div className="mt-auto flex items-center justify-around px-2 py-1 shadow-[0_-1px_5px_rgba(0,0,0,0.25)]">
      <NavItem
        href="/profile"
        title={t('profile.title')}
        icon={<UserCircle2Icon className="size-6 md:size-10" />}
        isValid={valid_page.profile}
      />
      <NavItem
        href="/member"
        title={t('member.title')}
        icon={<Users2Icon className="size-6 md:size-10" />}
        isValid={valid_page.member}
      />
      <NavItem
        href="/"
        title={t('home.title')}
        icon={<HomeIcon className="size-6 md:size-10" />}
        isValid={true}
      />
      <NavItem
        href="/wallet"
        title={t('wallet.title')}
        icon={<WalletIcon className="size-6 md:size-10" />}
        isValid={valid_page.wallet}
      />
      <NavItem
        href="/settings"
        title={t('setting.title')}
        icon={<SettingsIcon className="size-6 md:size-10" />}
        isValid={true}
      />
    </div>
  )
}

const NavItem = (props: {
  href: string
  title: string
  className?: string
  icon: React.ReactNode
  isValid: boolean
}) => {
  const { href, className, icon, title } = props

  return (
    <Link
      href={href}
      className={cn(
        'flex cursor-pointer flex-col items-center gap-2 p-3 text-white/80',
        className
      )}
    >
      {icon}
      <span className="hidden md:flex">{title}</span>
    </Link>
  )
}

export default Navbar
