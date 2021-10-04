import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'
import mongoose from 'mongoose'
import { ObjectID } from 'mongodb'
import { Cart } from '../../models'
import { Order } from '../../models'

export default {
  get: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { user } = req.session

      if (!user) throw new createHttpError.BadRequest()

      // const result = await Order.find({ user: user.id })
      //   .select({
      //     products: {
      //       title: 1,
      //       quantity: 1,
      //       price: 1,
      //       orderStatus: 1,
      //       seller: {
      //         name: 1
      //       }
      //     }
      //   })
      //   .lean()

      const result = await Order.aggregate([
        { $match: { user: mongoose.Types.ObjectId(user?.id) } },
        { $unwind: '$products' },
        {
          $project: {
            products: {
              productId: 1,
              title: 1,
              thumbnail: 1,
              quantity: 1,
              price: 1,
              orderStatus: 1,
              seller: {
                name: 1
              }
            }
          }
        }
      ])

      if (!result) throw new createHttpError.BadRequest()

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  },
  getById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { id, product }: any = req.params

      if (
        !ObjectID.isValid(id) ||
        !id ||
        (product && !ObjectID.isValid(product))
      )
        throw new createHttpError.BadRequest('Invalid Id')

      const { user } = req.session

      if (!user) throw new createHttpError.BadRequest()

      const order = await Order.findById(id)

      if (!order) throw new createHttpError.BadRequest('No Orders')

      let result

      if (product) {
        const filterProduct = order.products.filter(
          (p) => p.productId == product
        )

        result = {
          _id: order._id,
          createdAt: order.createdAt,
          product: filterProduct[0]
        }
      } else {
        const {
          totalItemscount,
          totalItemsAmt,
          totalDelivery,
          totalTax,
          totalDiscount
        } = order.products.reduce(
          (acc, { quantity, deliveryCharge, tax, discount, price }) => {
            acc.totalItemscount = acc.totalItemscount + quantity
            acc.totalDelivery = acc.totalDelivery + deliveryCharge
            acc.totalTax = acc.totalTax + tax
            acc.totalDiscount = acc.totalDiscount + discount
            acc.totalItemsAmt = acc.totalItemsAmt + price
            return acc
          },
          {
            totalItemscount: 0,
            totalItemsAmt: 0,
            totalDelivery: 0,
            totalTax: 0,
            totalDiscount: 0
          }
        )

        const newdata = {
          ...order.toJSON(),
          totalItemscount,
          totalItemsAmt,
          totalDelivery,
          totalTax,
          totalDiscount,
          orderTotal: totalItemsAmt + totalDelivery + totalTax + totalDiscount
        }
        result = newdata
      }

      res.status(200).json(result)
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
      //   const { addressId } = req.body

      const { user } = req.session

      const cart = await Cart.findOne({ user: user?.id }).populate({
        path: 'items.product',
        model: 'Product',
        populate: {
          path: 'sellerId',
          model: 'User',
          select: {
            name: 1
          }
        }
      })

      if (!cart || cart.items.length <= 0)
        throw new createHttpError.BadRequest('Cart is empty')

      const product = cart.items.map((item: any) => {
        return {
          productId: item.product._id,
          title: item.product.title,
          thumbnail: item.product.images[0].filename,
          slug: item.product.slug,
          sku: item.product.sku,
          price: item.product.price,
          quantity: item.quantity,
          deliveryCharge: item.product.deliveryCharge,
          tax: item.product.tax,
          discount: item.product.discount,
          deliveryEstimate: Date.now,
          orderStatus: [
            {
              type: 'pending',
              date: new Date(),
              isCompleted: true
            }
          ],
          seller: {
            sellerId: item.product.sellerId._id,
            name: item.product.sellerId.name
            //   slug: string
          }
        }
      })

      const order = new Order({
        user: user?.id,
        orderDate: new Date(),
        paymentType: 'cod',
        paymentStatus: 'pending',
        products: product
      })

      const result = await order.save()

      if (!result) throw new createHttpError.BadRequest('Failed to place order')
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }
}
