import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import { ObjectID } from 'mongodb'
import { Product, Wishlist } from '../../models'

export default {
  Get: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { user } = req.session

      if (!user) throw new createHttpError.BadRequest()

      const find = await Wishlist.findOne({ user: user?.id })
        .select('items')
        .populate({
          path: 'items',
          model: 'Product',
          select: {
            _id: 1,
            title: 1,
            slug: 1,
            artist: 1,
            price: 1,
            images: { $first: '$images' },
            stockQty: 1,
            category: 1,
            sellerId: 1
          },
          populate: {
            path: 'sellerId',
            model: 'User',
            select: {
              _id: 0,
              name: 1,
              avatar: 1
            }
          }
        })
        .lean()

      // const find: any = await Wishlist.aggregate([
      //   { $match: { user: mongoose.Types.ObjectId(user?.id) } },
      //   {
      //     $lookup: {
      //       from: 'products',
      //       localField: 'items',
      //       foreignField: '_id',
      //       as: 'items'
      //     }
      //   },
      //   { $unwind: '$items' },
      //   {
      //     $lookup: {
      //       from: 'users',
      //       localField: 'items.sellerId',
      //       foreignField: '_id',
      //       as: 'seller'
      //     }
      //   },
      //   { $unwind: '$seller' },
      //   {
      //     $project: {
      //       items: {
      //         _id: 1,
      //         title: 1,
      //         slug: 1,
      //         artist: 1,
      //         price: 1,
      //         images: { $first: '$items.images' },
      //         stockQty: 1,
      //         category: 1
      //       },
      //       seller: {
      //         name: 1,
      //         avatar: 1
      //       }
      //     }
      //   }
      // ])

      if (!find) return res.status(200).json({ items: [] })

      return res.status(200).json(find)
    } catch (error) {
      next(error)
    }
  },

  Add: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { id } = req.body

      const { user } = req.session

      if (!user) throw new createHttpError.BadRequest()

      if (!ObjectID.isValid(id) || !id)
        throw new createHttpError.BadRequest('Invalid Id')

      const product = await Product.findById(id).lean()

      if (!product) throw new createHttpError.BadRequest('No Product found')

      const query = {
        user: user.id,
        items: { $not: { $elemMatch: { $eq: id } } }
      }

      const update = {
        user: user.id,
        $addToSet: { items: id }
      }

      const options = {
        upsert: true,
        new: true
      }

      const updated = await Wishlist.findOneAndUpdate(query, update, options)

      if (!updated) throw new createHttpError.BadRequest('Failed to update')

      return res.status(200).json(updated)
    } catch (error) {
      next(error)
    }
  },

  Delete: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { id } = req.params

      const { user } = req.session

      if (!user) throw new createHttpError.BadRequest()

      let updated

      if (id) {
        if (!ObjectID.isValid(id))
          throw new createHttpError.BadRequest('No Product found')

        const query = {
          user: user.id,
          items: { $elemMatch: { $eq: id } }
        }

        const update = {
          $pull: { items: id }
        }

        const options = {
          new: true
        }

        updated = await Wishlist.findOneAndUpdate(query, update, options)
      } else {
        updated = await Wishlist.findOneAndDelete({ user: user.id })
      }

      if (!updated) throw new createHttpError.BadRequest('Failed to Delete')

      return res.status(200).json(updated)
    } catch (error) {
      next(error)
    }
  }
}
