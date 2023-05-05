import dotenv from 'dotenv'

// process.env.VAR_NAME
dotenv.config()

console.log('Hello ', process.env.USER)
