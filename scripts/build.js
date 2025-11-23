#!/usr/bin/env node
const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

// Get tenant from argument or environment variable
const tenant = process.env.TENANT || process.argv[2] || 'tenant-dev'
console.log(`\n🏗️  Building for tenant: ${tenant}\n`)

// Verify tenant exists
const tenantDir = path.join(__dirname, `../companyList/${tenant}`)
if (!fs.existsSync(tenantDir)) {
  console.error(`❌ Tenant "${tenant}" not found in companyList/`)
  process.exit(1)
}

// Clear .next cache (always clear for build)
const nextDir = path.join(__dirname, '../.next')
if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true })
  console.log('✅ Cleared .next cache')
}

// Update .last-tenant for start script consistency
const lastTenantFile = path.join(__dirname, '../.last-tenant')
fs.writeFileSync(lastTenantFile, tenant)
console.log('✅ Updated .last-tenant')

// Update tsconfig.json
const tsconfigPath = path.join(__dirname, '../tsconfig.json')
const tsconfig = require(tsconfigPath)
tsconfig.compilerOptions.paths['@tenant-config'] = [`./companyList/${tenant}`]
tsconfig.compilerOptions.paths['@assets/*'] = [
  `./companyList/${tenant}/assets/*`
]
fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2))
console.log('✅ Updated tsconfig.json paths')

// Copy tenant favicon to app/icon.svg
const faviconSrc = path.join(
  __dirname,
  `../companyList/${tenant}/assets/favicon.svg`
)
const faviconDest = path.join(__dirname, '../app/icon.svg')
if (fs.existsSync(faviconSrc)) {
  fs.copyFileSync(faviconSrc, faviconDest)
  console.log('✅ Copied tenant favicon')
}

// Run next build
console.log('\n📦 Running next build...\n')
try {
  execSync('next build', {
    stdio: 'inherit',
    env: { ...process.env, TENANT: tenant }
  })
  console.log(`\n✅ Build completed for ${tenant}`)
  console.log(`   Output: .next/`)
} catch (error) {
  console.error('\n❌ Build failed')
  process.exit(1)
}
