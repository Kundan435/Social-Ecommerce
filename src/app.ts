import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import session, { Store } from 'express-session'
import compression from 'compression'
import createHttpError from 'http-errors'
import path from 'path'
import RoutesV1 from './api/v1/routes'
import { SESSION_OPTIONS } from './config'
import { ResponseError } from './api/v1/interfaces'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createApp = (store: Store) => {
  const app = express()

  app.disable('x-powered-by')
  app.use(
    cors({
      origin: true,
      credentials: true
    })
  )
  app.use(morgan('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use(session({ ...SESSION_OPTIONS, store }))

  app.use(
    compression({
      level: 6,
      threshold: 100 * 1000,
      filter: (req, _res) => {
        if (req.headers['x-no-compression']) {
          return false
        }
        return true
      }
    })
  )

  // ####### PASSPORT JS

  // app.use(passport.initialize())
  // app.use(passport.session())
  // require('./api/v1/utils/localAuth')

  // app.use((req: Request, _res: Response, next: NextFunction) => {
  //     // res.locals.user = req.user
  //     req.user = req.session.user
  //     next()
  // })

  app.use('/api/v1', RoutesV1)

  const __dirname = path.resolve()

  app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

  app.use(async (_req: Request, _res: Response, next: NextFunction) => {
    next(new createHttpError.NotFound())
  })

  // app.use((err: ResponseError, _req: Request, res: Response, _next: NextFunction) => {
  //     res.status(err.status || 500)
  //     res.send({
  //         error: {
  //             status: err.status || 500,
  //             message: err.message
  //         }
  //     })
  // })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use(
    (err: ResponseError, _req: Request, res: Response, _next: NextFunction) => {
      res.status(err.status || 500)
      return res.send({
        error: {
          status: err.status || 500,
          message: err.message || 'Something went wrong',
          stack: err.stack
        }
        // stack: IN_PROD ? null : err.stack,
      })
    }
  )

  return app
}
