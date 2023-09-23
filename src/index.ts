import dotenv from 'dotenv'
import { helloWorld, asyncHelloWorld } from './helloWorld.js'

// process.env.VAR_NAME
dotenv.config()

const { USER } = process.env

helloWorld(USER)
asyncHelloWorld(USER)
