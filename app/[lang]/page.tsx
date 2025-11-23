import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Avatar from '@/components/Avatar'
import Logo from '@/components/Logo'
import Navbar from '@/components/Navbar'
import banner from '@assets/banner.webp'
import tenantConfig from '@tenant-config'
import { cn } from '@/lib/utils'

export default function Home() {
  const t = useTranslations('home')

  return (
    <div className="flex size-full flex-col">
      <div className="overflow-auto py-10 sm:px-6 lg:px-12">
        <header className="relative mx-4 flex h-14 items-center justify-between sm:mx-0">
          <Logo />
          <div className="pointer-events-none absolute hidden w-full text-center text-3xl font-semibold text-white sm:block">
            {t('title')}
          </div>
          <Avatar />
        </header>
        <main className="mt-10 px-4">
          <div className="space-y-5">
            <section>
              <Title>{t('bannerSection')}</Title>
              <div className="mt-4">
                <PlaceholderImage
                  src={banner as any as HTMLImageElement['src']}
                  classname="opacity-100 overflow-hidden"
                />
              </div>
            </section>
            {['electron', 'fish', 'sport', 'lottery', 'live']
              .filter((item) => tenantConfig.games.includes(item))
              .map((item) => (
                <section key={item}>
                  <Title>{t(item)}</Title>
                  <div className="mt-4 w-full overflow-auto">
                    <div className="flex w-fit gap-5">
                      {[...Array(5).keys()].map((index) => (
                        <PlaceholderImage
                          key={index}
                          classname="size-40 md:size-60"
                        />
                      ))}
                    </div>
                  </div>
                </section>
              ))}
          </div>
        </main>
      </div>
      <Navbar />
    </div>
  )
}

const Title = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      className={cn(
        'h-10 w-36 rounded-md bg-zinc-400/50',
        children && 'h-fit w-fit bg-transparent text-xl font-bold text-white'
      )}
    >
      {children}
    </div>
  )
}

const PlaceholderImage = ({
  classname,
  src
}: {
  classname?: string
  src?: HTMLImageElement['src']
}) => {
  const t = useTranslations('home')

  return (
    <div
      className={cn(
        'bg-secondary-bg flex h-60 w-full items-center justify-center rounded-md text-2xl font-semibold text-white opacity-50 shadow-lg',
        classname
      )}
    >
      {src ? (
        <Image src={src} alt="placeholder" className="size-full object-cover" />
      ) : (
        t('placeholderImage')
      )}
    </div>
  )
}
