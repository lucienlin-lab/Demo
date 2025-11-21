#!/usr/bin/env node
const { spawn } = require('child_process')
const path = require('path')
const fs = require('fs')

// Cleared .next cache
const nextDir = path.join(__dirname, '../.next')
if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true })
  console.log('✅ Cleared .next cache')
}

// Set TENANT
const tenant = process.env.TENANT || process.argv[2] || 'tenant-dev'
process.env.TENANT = process.env.TENANT || tenant

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
