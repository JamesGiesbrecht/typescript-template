import { RequestHandler } from 'express'
import { helloWorld, asyncHelloWorld } from '../services/handler.service.js'

const { USER } = process.env

export const getHelloWorld: RequestHandler = (req, res) => {
  try {
    const message = { message: helloWorld(USER) }
    res.json(message)
  } catch (error) {
    res.status(500).send(error)
  }
}

export const getHelloWorldAsync: RequestHandler = async (req, res) => {
  try {
    const message = { message: await asyncHelloWorld(USER, 1) }
    res.json(message)
  } catch (error) {
    res.status(500).send(error)
  }
}
