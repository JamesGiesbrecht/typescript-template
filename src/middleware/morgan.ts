import fs from 'fs'

import { LOG_FILE } from '../constants/index.js'

// Catches all routes
export const LOGGED_ROUTES = ['/']

// Check if the log file exists
if (!fs.existsSync(LOG_FILE)) {
  // Create the log file
  fs.writeFileSync(LOG_FILE, '', { flag: 'wx' })
}

export const log = fs.createWriteStream(LOG_FILE, {
  flags: 'a',
})
