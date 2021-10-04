import { Response, Request, NextFunction } from 'express'
import createHttpError from 'http-errors'
import { ObjectID } from 'mongodb'
import { Seller, User } from '../../models'
// import Redis from 'ioredis'

export default {
  getAll: async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const users = await User.find({})
        .lean()
        .limit(20)
        .select('_id name avatar email role createdAt status online')
        .sort('-createdAt')

      if (!users) return res.json([])
      return res.json(users)
    } catch (error) {
      next(error)
    }
  },
  getById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params

      if (!id) throw new createHttpError.BadRequest()

      const user = await User.findById({ _id: id }).select('-password').lean()

      if (!user) throw new createHttpError.NotFound('User Not Found')

      let result

      result = { user }

      if (user.role === 'seller') {
        const seller = await Seller.findOne({ seller: user._id }).lean()

        result = { user, seller }
      }

      res.json(result)
    } catch (error) {
      next(error)
    }
  },

  updateUser: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        name,
        username,
        avatar,
        email,
        gender,
        contactNumber,
        status,
        role
      } = req.body

      const { id } = req.params

      if (!ObjectID.isValid(id) || !id)
        throw new createHttpError.BadRequest('Invalid Id')

      const oldData = await User.findById(id).select('-password')

      if (!oldData) throw new createHttpError.BadRequest('User Not Found')

      oldData.name = name
      oldData.username = username
      oldData.avatar = avatar
      oldData.email = email
      oldData.contactNumber = contactNumber
      oldData.role = role
      oldData.status = status
      oldData.gender = gender

      const updatedUser = await oldData.save()

      if (!updatedUser) throw new createHttpError.BadRequest('Failed to update')

      res.json(updatedUser)
    } catch (error) {
      next(error)
    }
  },

  updateSeller: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { sellerType, address, country, state, pincode, city } = req.body
      const { id } = req.params

      if (!ObjectID.isValid(id) || !id)
        throw new createHttpError.BadRequest('Invalid Id')

      //         const billingAddress = {
      //   address,
      //   country,
      //   state,
      //   pincode,
      //   city
      // }
      const update = {
        sellerType,
        seller: id,

        billingAddress: {
          address,
          country,
          state,
          pincode,
          city
        }
      }
      const options = {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true
      }

      const seller = await Seller.findOneAndUpdate(
        { seller: id },
        update,
        options
      )

      if (!seller) throw new createHttpError.BadRequest('Failed to update')

      res.json(seller)
    } catch (error) {
      next(error)
    }
  },

  delete: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params
      if (id) {
        const deletedUser = await User.findByIdAndDelete(id)

        if (!deletedUser)
          throw new createHttpError.BadRequest('Failed to delete')
        res.json({ message: 'Deleted successfully' })
      } else {
        throw new createHttpError.BadRequest('Params Required')
      }
    } catch (error) {
      next(error)
    }
  },

  kickUser: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // const client = new Redis()

      // const stream = client.scanStream()
      // stream.on("data", (resultKeys) => {
      //     // `resultKeys` is an array of strings representing key names.
      //     // Note that resultKeys may contain 0 keys, and that it will sometimes
      //     // contain duplicates due to SCAN's implementation in Redis.
      //     for (let i = 0; i < resultKeys.length; i++) {
      //         console.log(resultKeys[i])
      //     }
      // })
      // stream.on("end", () => {
      //     console.log("all keys have been visited")
      // })
      // res.send(req.session)
      res.send(req.session)
    } catch (error) {
      next(error)
    }
  }
}
