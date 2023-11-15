import { NextFunction, Request, RequestHandler, Response } from 'express'
import basicAuth from 'express-basic-auth'

const { ADMIN_USERNAME, ADMIN_PASSWORD, API_KEY, NO_AUTH } = process.env

const unauthorizedResponse = (res: Response, errorMessage?: string) => {
  const message = errorMessage || 'Unauthorized'
  res.status(401).json({ message })
}

export const apiKeyMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const apiKey = req.header('x-api-key')
  if (!apiKey || apiKey !== API_KEY) {
    unauthorizedResponse(res, 'Invalid API Key')
  } else {
    next()
  }
}

export const tokenAuthMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header('Authorization')
  if (!token || token !== `Bearer ${API_KEY}`) {
    unauthorizedResponse(res, 'Invalid Bearer Token')
  } else {
    next()
  }
}

export const basicAuthMiddleware = basicAuth({
  authorizer: (username: string, password: string) => {
    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
      console.error('Basic auth not configured')
      return false
    }
    const userMatches = basicAuth.safeCompare(username, ADMIN_USERNAME)
    const passwordMatches = basicAuth.safeCompare(password, ADMIN_PASSWORD)
    return userMatches && passwordMatches
  },
  unauthorizedResponse,
})

export const authRouterMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (NO_AUTH) {
    console.warn('AUTH DISABLED')
    next()
    return
  }

  if (!API_KEY) {
    unauthorizedResponse(res, 'API_KEY not configured')
  }

  const apiKey = req.header('x-api-key')
  const auth = req.header('Authorization')

  if (apiKey) {
    apiKeyMiddleware(req, res, next)
  } else if (auth) {
    if (auth.startsWith('Bearer')) {
      tokenAuthMiddleware(req, res, next)
    } else if (auth.startsWith('Basic')) {
      basicAuthMiddleware(req, res, next)
    }
  } else {
    unauthorizedResponse(res, 'No credentials provided')
  }
}

export const generateApiKey = () => {
  const keyLength = 32
  let apiKey = 'gfa-'
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < keyLength; i += 1) {
    apiKey += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return apiKey
}
