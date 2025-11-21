const child_process = require('child_process')
const fs = require('fs')

const companies = fs
  .readdirSync('./companyList')
  .filter((f) => f.includes('tenant'))
