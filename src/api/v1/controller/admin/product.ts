import { Response, Request, NextFunction } from 'express'
import slugify from 'slugify'
import createHttpError from 'http-errors'
import { IProduct, Product } from '../../models'
// import { productValidate } from '../../validation'

export default {
  create: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      // res.status(200).json({ file: req.files, body: req.body });

      const product: IProduct = new Product({
        title: 'untitled',
        price: 0,
        stockQty: 0,
        status: 'draft',
        category: '60d43b2c4270af09182737ef',
        seller: req.session.user?.id
      })

      const createdProduct = await product.save()

      if (!createdProduct)
        throw new createHttpError.BadRequest('Failed to save product')
      res.status(201).json(createdProduct)
    } catch (error) {
      if (error.isJoi === true) error.status = 422
      next(error)
    }
  },

  update: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    // res.status(200).json({ file: req.files, body: req.body })

    try {
      const {
        title,
        mywork,
        original,
        highlights,
        weight,
        dimensions,
        deliveryCharge,
        returns,
        certificate,
        sku,
        artist,
        price,
        description,
        stockQty,
        status
      } = req.body

      // await productValidate.validateAsync(req.body, { abortEarly: false })

      const files = req.files as any

      const { updateProductId, method, img_id } = req.params

      const options = { new: true }

      if (updateProductId) {
        let updatedProduct

        const oldProduct = await Product.findById(updateProductId)

        if (!oldProduct)
          throw new createHttpError.BadRequest('Product Not Found')

        if (!method) {
          ;(oldProduct.title = title),
            (oldProduct.mywork = mywork),
            (oldProduct.original = original),
            (oldProduct.slug = slugify(`${artist}-${title}`, {
              lower: true,
              remove: /[`^_/,{}*+~.()'"!:@[\]]/g
            })),
            (oldProduct.artist = artist),
            (oldProduct.price = price),
            (oldProduct.description = description),
            (oldProduct.highlights = highlights),
            (oldProduct.weight = weight),
            (oldProduct.dimensions = dimensions),
            (oldProduct.deliveryCharge = deliveryCharge),
            (oldProduct.returns = returns),
            (oldProduct.certificate = certificate),
            (oldProduct.sku = sku),
            (oldProduct.stockQty = stockQty),
            (oldProduct.status = status)

          updatedProduct = await oldProduct.save()
        }

        if (method === 'add_img') {
          const limit = 10

          const oldLenght = oldProduct.images.length

          const remaining = limit - oldLenght

          let images = []

          if (oldLenght >= limit) {
            throw new createHttpError.BadRequest('Max Images limit reached')
          }

          if (!files.images) {
            throw new createHttpError.BadRequest('Images not attached')
          }

          const imgs = files.images.slice(-remaining)

          images = imgs.map((file: any) => {
            return {
              filename: file.filename,
              path: file.path,
              size: file.size
            }
          })

          updatedProduct = await Product.findByIdAndUpdate(
            updateProductId,
            {
              $push: {
                images
              }
            },
            options
          )
        }

        if (method === 'rm_img' && img_id) {
          const find = await Product.findById(updateProductId, {
            images: {
              $elemMatch: { _id: img_id }
            }
          })

          if (find) {
            if (find.images.length <= 0) {
              throw new createHttpError.BadRequest('Image not found')
            }

            updatedProduct = await Product.findByIdAndUpdate(
              updateProductId,
              {
                $pull: {
                  images: {
                    _id: img_id
                  }
                }
              },
              options
            )
          }
        }

        if (!updatedProduct)
          throw new createHttpError.BadRequest('Failed to update')

        res.status(201).json(updatedProduct)
      } else {
        throw new createHttpError.BadRequest('Params required')
      }
    } catch (error) {
      if (error.isJoi === true) error.status = 422
      next(error)
    }
  },

  getAll: async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const products = await Product.find({})
        .lean()
        .limit(20)
        .populate({
          path: 'category',
          model: 'Category',
          select: 'name'
        })
        .populate({
          path: 'seller',
          model: 'User',
          select: 'username avatar'
        })
        .select({
          title: 1,
          slug: 1,
          category: 1,
          images: { $first: '$images' },
          sku: 1,
          stockQty: 1,
          price: 1,
          status: 1
        })

      if (!products) return res.json([])
      return res.json(products)
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
      const { productId } = req.params
      if (productId) {
        const product = await Product.findById({ _id: productId }).lean()
        if (!product) throw new createHttpError.NotFound('Product Not Found')
        res.json({ product })
      } else {
        throw new createHttpError.BadRequest('Params Required')
      }
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
      const { productDeleteId } = req.params
      if (productDeleteId) {
        const product = await Product.findByIdAndDelete(productDeleteId)

        if (!product) throw new createHttpError.BadRequest('Failed to delete')
        res.json({ message: 'Deleted successfully' })
      } else {
        throw new createHttpError.BadRequest('Params Required')
      }
    } catch (error) {
      next(error)
    }
  }
}
