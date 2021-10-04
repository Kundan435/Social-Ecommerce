import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import { Cart, Wishlist } from '../../models'

export default {
  basicInfo: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { user } = req.session

      if (!user) throw new createHttpError.BadRequest()
      const wishlist = await Wishlist.findOne({ user: user.id })
        .select('items')
        .lean()
      const cart = await Cart.findOne({ user: user.id }).select('items').lean()

      const basicInfo = {
        wishlist,
        cart
      }

      res.status(200).json(basicInfo)
    } catch (error) {
      next(error)
    }
  }
}
