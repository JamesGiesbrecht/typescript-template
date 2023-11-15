import express from 'express'

import {
  getHelloWorld,
  getHelloWorldAsync,
} from '../../controllers/handler.controller.js'

const router = express.Router()

router.get('/hello-world', getHelloWorld)

router.get('/hello-world-async', await getHelloWorldAsync)

export default router
