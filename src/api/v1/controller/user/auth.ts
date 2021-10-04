import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import passport from 'passport'
import { registerSchema } from '../../validation'
import { User } from '../../models'
// import { logOut } from '../helpers'
// import { sendMail } from '../mail'

export default {
  register: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await registerSchema.validateAsync(req.body, { abortEarly: false })

      const { email, name, username, password } = req.body

      const foundEmail = await User.findOne({ email })
      const foundUsername = await User.findOne({ username })

      if (foundEmail) {
        throw new createHttpError.Conflict('Email already exists')
      }
      if (foundUsername) {
        throw new createHttpError.Conflict('Username already exist')
      }

      const user = await User.create({
        email,
        name,
        username,
        password
      })
      req.login(user, (err) => {
        if (err) {
          return next(err)
        }
        return res.json({ message: 'Registered sucessfully!' })
      })
    } catch (error) {
      if (error.isJoi === true) error.status = 422
      next(error)
    }
  },

  check: (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        // throw new Error('No order items')
        throw new createHttpError.Unauthorized('Not Logged In')
      }
      res.send(req.user)
    } catch (error) {
      next(error)
    }
  },

  login: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      passport.authenticate('local', (err, user, info) => {
        if (err) {
          return next(err)
        }
        if (info) {
          return res.send(info)
        }
        if (!user) {
          return res.json({ message: 'Failed' })
        }

        req.logIn(user, (err) => {
          if (err) {
            return next(err)
          }
          return res.json({ message: 'Ok' })
        })
      })(req, res, next)
    } catch (error) {
      next(error)
    }
  },

  // login: passport.authenticate('local', {
  //     failureMessage: 'Incorrect Username or Password',
  //     successMessage: 'Sucessfully Logged In'

  // }),

  // login: (req: Request, res: Response, next: NextFunction) => {
  //     passport.authenticate('local', function (err, user, isMatch) {
  //         if (err) {
  //             return next(err)
  //         }
  //         if (!user) {
  //             return new createHttpError.BadRequest('Incorrect Email or Password')
  //         }
  //     })(req, res, next);
  // },

  // try {

  // } catch (error) {
  //     // if (error.isJoi === true)
  //     //     error.status = 422
  //     // error.message = 'Incorrect Email or Password'
  //     next(error)
  // }
  // },

  logout: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      req.logout()
      // await logOut(req, res)

      res.json({ message: 'OK' })
    } catch (error) {
      if (error.isJoi === true) error.status = 422
      next(error)
    }
  }
}
