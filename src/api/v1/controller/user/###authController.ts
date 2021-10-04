import { NextFunction, Request, Response } from 'express'
import { loginSchema, registerSchema } from '../../validation'
import { User } from '../../models'
import createHttpError from 'http-errors'
import { logIn, logOut } from '../../helpers'
// import { sendMail } from '../mail'

export default {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await registerSchema.validateAsync(req.body, { abortEarly: false })

      const { email, name, username, password } = req.body

      const found = await User.exists({ email })

      if (found) {
        throw new createHttpError.Conflict('Email already registered')
      }

      const user = await User.create({
        email,
        name,
        username,
        password
      })

      logIn(req, user.id, user.role)

      // const link = user.verificationUrl()

      // await sendMail({
      //     to: email,
      //     subject: 'Verify your email address',
      //     text: link
      // })

      res.json(req.session)
    } catch (error) {
      if (error.isJoi === true) error.status = 422
      next(error)
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await loginSchema.validateAsync(req.body, { abortEarly: false })

      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user || !(await user.matchesPassword(password))) {
        throw new createHttpError.BadRequest('Incorrect Email or Password')
      }

      logIn(req, user.id, user.role)
      console.log(req.session.user)

      res.json(req.session)
    } catch (error) {
      if (error.isJoi === true) error.status = 422
      error.message = 'Incorrect Email or Password'
      next(error)
    }
  },

  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await logOut(req, res)

      res.json({ message: req.session })
    } catch (error) {
      if (error.isJoi === true) error.status = 422
      next(error)
    }
  },

  check: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.session.user) {
        // throw new Error('No order items')
        throw new createHttpError.Unauthorized('Not Logged In')
      }
      res.send(req.session.user)
    } catch (error) {
      next(error)
    }
  }
}
