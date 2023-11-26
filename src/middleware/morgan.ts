import fs from 'fs'

import { LOG_FILE } from '../constants'

// Catches all routes
export const LOGGED_ROUTES = ['/']

export const log = fs.createWriteStream(LOG_FILE, {
  flags: 'a',
})
