import { Response, Request, NextFunction } from 'express'
import createHttpError from 'http-errors'
import { Product } from '../../models'

export default {
  getProductsBySlug: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { productSlug } = req.params
      if (productSlug) {
        const product = await Product.findOne({ slug: productSlug }).lean()

        if (!product) throw new createHttpError.NotFound('Product Not Found')

        const query = {
          $project: {
            title: 1,
            slug: 1,
            artist: 1,
            price: 1,
            images: { $first: '$images' },
            category: 1
          }
        }

        const extras: any = await Product.aggregate([
          {
            $facet: {
              artistProducts: [
                {
                  $match: {
                    artist: product.artist,
                    slug: { $not: { $eq: productSlug } }
                  }
                },
                query,
                { $sort: { Date: -1 } },
                { $limit: 5 }
              ],
              similarProducts: [
                {
                  $match: {
                    category: product.category,
                    slug: { $not: { $eq: productSlug } }
                  }
                },
                query,
                { $sort: { Date: -1 } },
                { $limit: 5 }
              ]
            }
          }
        ])

        const artistProducts = extras[0].artistProducts
        const similarProducts = extras[0].similarProducts

        // .facet({
        //   artistProducts: [{ $match: { artist: product.artist } }],
        //   similarProducts: [{ $match: { category: product.category } }]
        // })

        // const similarProducts = await Product.find({
        //   category: product.category,
        //   artist: 'Artist 1'
        // })
        //   .select('title slug artist images price')
        //   .limit(5)
        //   .lean()

        res.json({ product, artistProducts, similarProducts })
      } else {
        throw new createHttpError.BadRequest('Params Required')
      }
    } catch (error) {
      next(error)
    }
  }
}
