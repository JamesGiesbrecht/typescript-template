import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const LOG_FILE_ENV = process.env.LOG_FILE

const filename = fileURLToPath(import.meta.url)
const fileDirname = dirname(filename)

export const ROOT = path.join(fileDirname, '../../')
export const DIST = path.join(ROOT, 'dist')

const logFile = path.join(ROOT, 'logs', 'express.log')

export const LOG_FILE = LOG_FILE_ENV ? path.join(ROOT, LOG_FILE_ENV) : logFile
