import Image from 'next/image'
import logo from '@assets/logo.svg'
import tenantConfig from '@tenant-config'
import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
}

function Logo({ className }: LogoProps) {
  return (
    <Image
      src={logo}
      alt={tenantConfig.tenantName}
      className={cn('h-10 w-auto object-contain', className)}
    />
  )
}

export default Logo
