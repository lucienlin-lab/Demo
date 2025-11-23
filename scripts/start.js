#!/usr/bin/env node
const { spawn } = require('child_process')
const path = require('path')
const fs = require('fs')

// Set TENANT
const tenant = process.env.TENANT || process.argv[2] || 'tenant-dev'
process.env.TENANT = process.env.TENANT || tenant

// Check if tenant changed - only clear cache if different
const lastTenantFile = path.join(__dirname, '../.last-tenant')
const lastTenant = fs.existsSync(lastTenantFile)
  ? fs.readFileSync(lastTenantFile, 'utf-8').trim()
  : null

if (lastTenant !== tenant) {
  const nextDir = path.join(__dirname, '../.next')
  if (fs.existsSync(nextDir)) {
    fs.rmSync(nextDir, { recursive: true, force: true })
    console.log('✅ Cleared .next cache (tenant changed)')
  }
  fs.writeFileSync(lastTenantFile, tenant)
} else {
  console.log(`✅ Using cached build for ${tenant}`)
}

// Update tsconfig.json
const tsconfig = require('../tsconfig.json')
tsconfig.compilerOptions.paths['@tenant-config'] = [`./companyList/${tenant}`]
tsconfig.compilerOptions.paths['@assets/*'] = [
  `./companyList/${tenant}/assets/*`
]
require('fs').writeFileSync(
  './tsconfig.json',
  JSON.stringify(tsconfig, null, 2)
)

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

const nextDev = spawn('next', ['dev', '--webpack'], {
  stdio: 'inherit', // 繼承父進程的輸入輸出
  shell: true
})

nextDev.on('error', (error) => {
  console.error('❌ 啟動失敗:', error)
  process.exit(1)
})

nextDev.on('close', (code) => {
  process.exit(code)
})
