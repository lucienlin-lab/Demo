'use client'

import { useLocale, useTranslations } from 'next-intl'
import { CheckIcon, ChevronRightIcon } from 'lucide-react'
import { Link, usePathname } from '@/components/Navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Header from '@/components/Header'
import { LOCALES } from '@/i18n/routing'

function Setting() {
  const t = useTranslations()
  const locale = useLocale()
  const pathname = usePathname()

  return (
    <div className="size-full">
      <Header title={t('setting.title')} />
      <div className="size-full px-4 py-12 text-white sm:px-10">
        <ul className="rounded-md shadow-lg">
          <li className="flex items-center justify-between p-4">
            <p>{t('setting.language')}</p>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <p className="flex cursor-pointer items-center">
                  {t('setting.' + locale)}
                  <ChevronRightIcon />
                </p>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {LOCALES.map((lang) => (
                  <DropdownMenuItem key={lang} asChild>
                    <Link
                      href={pathname}
                      locale={lang}
                      className="flex cursor-pointer items-center"
                    >
                      <p>{t('setting.' + lang)}</p>
                      {locale === lang && (
                        <CheckIcon className="stroke-3 text-pink-500" />
                      )}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Setting
