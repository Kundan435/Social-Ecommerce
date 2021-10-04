import { Response, Request, NextFunction } from 'express'
import createHttpError from 'http-errors'
import { Seller } from '../../models'

export default {
  register: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { user } = req.session

      const { sellerType, address, country, state, city, pincode } = req.body

      const seller = await Seller.findOne({ sellerId: user?.id }).lean()

      if (seller) throw new createHttpError.BadRequest('Already Registered')

      const newSeller = new Seller({
        seller: user?.id,
        sellerType,
        billingAddress: {
          address,
          country,
          state,
          city,
          pincode
        }
      })

      const response = await newSeller.save()

      if (!response) throw new createHttpError.BadRequest('Unable to Register')

      res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  }
}
