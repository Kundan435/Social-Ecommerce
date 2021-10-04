import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'
import { ObjectID } from 'mongodb'
import { Cart, Product } from '../../models'
// import mongoose from 'mongoose'

export default {
  get: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { user } = req.session
      const cart = await Cart.findOne({ user: user?.id })
        .populate({
          path: 'items.product',
          model: 'Product',
          select: {
            _id: 1,
            title: 1,
            slug: 1,
            stockQty: 1,
            returns: 1,
            deliveryCharge: 1,
            price: 1,
            images: { $first: '$images' }
          }
        })
        .lean()

      // const cart = await Cart.aggregate([
      //   {
      //     $match: {
      //       user: mongoose.Types.ObjectId(user?.id)
      //     }
      //   },
      //   { $unwind: '$items' },
      //   {
      //     $lookup: {
      //       from: 'products',
      //       localField: 'items.product',
      //       foreignField: '_id',
      //       as: 'items.product'
      //     }
      //   }
      //   { $unwind: '$items.product' },
      //   {
      //     $lookup: {
      //       from: 'users',
      //       localField: 'items.product.sellerId',
      //       foreignField: '_id',
      //       as: 'items.product.sellerId'
      //     }
      //   },
      //   { $unwind: '$items.product.sellerId' },
      //   {
      //     $group: {
      //       _id: '$_id',
      //       user: { $first: '$user' },
      //       items: {
      //         $push: {
      //           _id: '$items.product._id',
      //           title: '$items.product.title',
      //           stockQty: '$items.product.stockQty',
      //           slug: '$items.product.slug',
      //           price: '$items.product.price',
      //           deliveryCharge: '$items.product.deliveryCharge',
      //           returns: '$items.product.returns',
      //           images: { $first: '$items.product.images' },
      //           quantity: '$items.quantity',
      //           sellerId: {
      //             _id: '$items.product.sellerId._id',
      //             name: '$items.product.sellerId.name'
      //           }
      //         }
      //       }
      //     }
      //   }
      // ])

      if (!cart) res.status(200).json({ items: [] })

      return res.status(200).json(cart)
    } catch (error) {
      next(error)
    }
  },

  add: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { id } = req.body

      const { user } = req.session

      if (!id || !ObjectID.isValid(id)) throw new createHttpError.BadRequest()

      const product = await Product.findById(id).lean()

      if (!product) throw new createHttpError.BadRequest('Invalid Product')

      const cart = await Cart.findOne({ user: user?.id })

      let updated

      if (cart) {
        const index = cart.items.findIndex((i) => i.product == id)

        if (index === -1) {
          cart.items.push({ product: id, quantity: 1 })
        } else {
          cart.items[index].quantity = cart.items[index].quantity + 1

          if (cart.items[index].quantity > product.stockQty) {
            throw new createHttpError.BadRequest(
              `Only ${product.stockQty} in stock`
            )
          }
        }
        updated = cart
      } else {
        updated = new Cart({
          user: user?.id,
          items: { product: id, quantity: 1 }
        })
      }
      const newCart = await updated.save()

      res.status(200).json(newCart)
    } catch (error) {
      next(error)
    }
  },

  remove: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { user } = req.session
      const { id } = req.body
      if (!id || !ObjectID.isValid(id)) throw new createHttpError.BadRequest()

      const query = {
        user: user?.id
      }

      const update = {
        $pull: {
          items: {
            product: id
          }
        }
      }

      const options = { new: true }

      const cart = await Cart.findByIdAndUpdate(query, update, options)

      if (!cart) throw new createHttpError.BadRequest('Failed to remove')

      res.status(200).json(cart)
    } catch (error) {
      next(error)
    }
  },

  empty: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { user } = req.session

      const { id } = req.params

      let cart

      if (id) {
        if (!ObjectID.isValid(id)) throw new createHttpError.BadRequest()

        const query = {
          user: user?.id
        }

        const update = {
          $pull: {
            items: {
              product: id
            }
          }
        }

        const options = { new: true }

        cart = await Cart.findOneAndUpdate(query, update, options)
      } else {
        cart = await Cart.deleteOne({ user: user?.id })
      }

      if (!cart) throw new createHttpError.BadRequest('Failed to remove')

      return res.status(200).json(cart)
    } catch (error) {
      next(error)
    }
  }
}
