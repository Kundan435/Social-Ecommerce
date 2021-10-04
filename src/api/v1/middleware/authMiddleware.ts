import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'
// import { BadRequest, Unauthorized } from '../errors'
// import { SESSION_ABSOLUTE_TIMEOUT } from '../config'
// import { catchAsync } from './errors'

export default {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  auth: (req: Request, _res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      throw new createHttpError.Unauthorized('You are not logged In')
    }
    return next()
  },

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  guest: (req: Request, _res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
      throw new createHttpError.BadRequest('You are already logged In')
    }
    return next()
  },
  isLoggedIn: (req: Request, _res: Response, next: NextFunction) => {
    if (!req.session.user) {
      throw new createHttpError.Unauthorized('You are not logged In')
    }
    return next()
  }
}
