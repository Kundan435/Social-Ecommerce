import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'
import { ObjectID } from 'mongodb'
import { userAddress } from '../../models/address'
import mongoose from 'mongoose'

export default {
  get: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { user } = req.session

      if (!user) throw new createHttpError.BadRequest()

      const result = await userAddress
        .findOne({ user: user.id })
        .select('address defaultAddress')
        .lean()

      if (!result) return res.status(200).json({ address: [] })

      return res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  },
  addUpdate: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const {
        id,
        name,
        mobileNumber,
        addressDetails,
        city,
        state,
        country,
        pincode,
        isDefault,
        addressType
      } = req.body

      let result

      let fieldId = id

      const { user } = req.session

      if (!user) throw new createHttpError.BadRequest()

      if (id && !ObjectID.isValid(id))
        throw new createHttpError.BadRequest('Invalid Params')

      if (!id) fieldId = mongoose.Types.ObjectId()

      const fields = {
        _id: fieldId,
        name,
        mobileNumber,
        addressDetails,
        city,
        state,
        country,
        pincode,
        addressType
      }

      const find = await userAddress.findOne({ user: user.id })

      if (!find) {
        const newAddress = new userAddress()

        newAddress.user = user.id

        newAddress.defaultAddress = fieldId

        newAddress.address.push(fields)

        result = await newAddress.save()
      } else {
        if (!id) {
          find.address.push(fields)
        } else {
          const index = find.address.findIndex((i) => i._id == id)
          find.address[index] = fields
        }

        if (isDefault) find.defaultAddress = fieldId

        result = await find.save()
      }

      result = {
        address: result.address,
        defaultAddress: result.defaultAddress
      }

      if (!result)
        throw new createHttpError.BadRequest('Failed to update address!')

      return res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  },
  delete: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { id } = req.body

      const { user } = req.session

      if (!user) throw new createHttpError.BadRequest()

      if (!id || !ObjectID.isValid(id))
        throw new createHttpError.BadRequest('Invalid Params')

      const query = { user: user.id }

      const update = {
        $pull: {
          address: {
            _id: id
          }
        }
      }

      const options = { new: true }

      const result = await userAddress
        .findOneAndUpdate(query, update, options)
        .select('address defaultAddress')

      if (!result)
        throw new createHttpError.BadRequest('Failed to delete address')

      return res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }
}
