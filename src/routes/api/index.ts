import express from 'express'

import handlerRoutes from './handler.route.js'

const router = express.Router()

router.use('/', handlerRoutes)

// Define error handling middleware after all other routers
router.use((req, res, next) => {
  res.status(404).json({ error: 'API Not Found' })
  next()
})

export default router
