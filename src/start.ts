import express, { Express } from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import morganBody from 'morgan-body'
import { LOGGED_ROUTES, log } from './middleware/morgan.js'
import apiRoutes from './routes/api/index.js'

import { authRouterMiddleware } from './middleware/auth.js'

const { NODE_ENV } = process.env
const PORT = process.env.PORT || 3000

const app: Express = express()
const server = http.createServer(app)

const setupMiddleware = async () => {
  app.use(bodyParser.json())

  morganBody(app, {
    noColors: true,
    stream: log,
    skip: (req: express.Request) => {
      const { originalUrl } = req
      const shouldLog = LOGGED_ROUTES.some((route) =>
        originalUrl.includes(route),
      )
      console.log({
        originalUrl,
        shouldLog,
        loggedRoutes: LOGGED_ROUTES,
      })
      // Skip routes not in the LOGGED_ROUTES array
      return !shouldLog
    },
  })
}

const setupRoutes = async () => {
  // Require auth for all /api routes
  app.use('/api', authRouterMiddleware, apiRoutes)

  app.use('/', (_req, res) => {
    res.json({
      message: 'Hello World',
      env: NODE_ENV || 'Not set',
      port: PORT || 'Not set',
    })
  })
}

const listen = async () => {
  server.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`)
  })
}

const init = async () => {
  await setupMiddleware()
  await setupRoutes()
  await listen()
}

init().catch((error) => {
  console.error(error)
  process.exit(1)
})
