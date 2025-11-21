import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import path from 'path'

const tenant = process.env.TENANT || 'tenant-dev'

const nextConfig: NextConfig = {
  webpack: (config) => {
    console.log(tenant)
    config.resolve.alias = {
      ...config.resolve.alias,
      '@tenant-config': path.resolve(__dirname, 'companyList', tenant),
      '@assets': path.resolve(__dirname, 'companyList', tenant, 'assets')
    }
    return config
  }
}

const withNextIntl = createNextIntlPlugin('./i18n/config.ts')

export default withNextIntl(nextConfig)
