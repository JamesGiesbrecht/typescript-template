import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const { LOG_FILENAME } = process.env

const filename = fileURLToPath(import.meta.url)
const fileDirname = dirname(filename)

export const ROOT = path.join(fileDirname, '../../')
export const DIST = path.join(ROOT, 'dist')

const logFilename = LOG_FILENAME || 'express.log'
const logDir = path.join(ROOT, 'logs')

// Create the log file directory if it doesn't exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}
export const LOG_FILE = path.join(logDir, logFilename)
