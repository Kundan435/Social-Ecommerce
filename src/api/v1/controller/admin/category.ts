import { Category, ICategory } from '../../models'
import slugify from 'slugify'
import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'


const createCategories = (categories: any[], parentId?: null | undefined) => {
    const categoryList: Array<any> = []
    let category
    if (parentId == null) {
        category = categories.filter((cat) => cat.parentId == undefined)
    } else {
        category = categories.filter((cat) => cat.parentId == parentId)
    }

    for (const cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            description: cate.description,
            status: cate.status,
            type: cate.type,
            children: createCategories(categories, cate._id),
        })
    }

    return categoryList
}

export default {

    create: async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {

            const { name, iconImg, coverImg, slug, description, status, parentId } = req.body

            const categoryObj: ICategory = new Category({
                name,
                iconImg,
                coverImg,
                slug: slugify(name),
                description,
                status,
                createdBy: req.user?._id
            })

            if (slug) categoryObj.slug = slugify(slug)

            if (req.body.parentId) {
                categoryObj.parentId = parentId
            }

            const category = await categoryObj.save()

            if (!category) throw new createHttpError.BadRequest('Failed to save category')

            res.status(201).json({ category })

        } catch (error) {
            next(error)
        }
    },

    getAll: async (_req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            Category.find({}).exec((error, categories) => {
                if (error)
                    throw new createHttpError.BadRequest('No categories found')
                // if (categories) {
                //     console.log(categories)
                //     const categoryList = createCategories(categories)
                //     res.status(200).json({ categoryList })
                // }
                if (categories) {
                    res.status(200).json(categories)
                }
                return
            })
        } catch (error) {
            next(error)
        }
    },

    update: async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { name, parentId, iconImg, coverImg, slug, status, description } = req.body
            const { updateCatId } = req.params
            const options = { new: true }

            if (updateCatId) {
                const updatedCategory = await Category.findByIdAndUpdate(
                    updateCatId,
                    {
                        name,
                        iconImg,
                        coverImg,
                        slug,
                        status,
                        description,
                        parentId,
                    },
                    options
                )

                if (!updatedCategory) throw new createHttpError.BadRequest('Failed to update')

                res.status(201).json(updatedCategory)
            } else {
                throw new createHttpError.BadRequest('Params required')
            }
        } catch (error) {
            next(error)
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { ids } = req.body

            if (ids) {
                const category = await Category.deleteMany({
                    _id: { $in: ids },
                })

                if (!category) throw new createHttpError.BadRequest('Failed to delete')
                res.json({ message: "Deleted successfully" })
            } else {
                throw new createHttpError.BadRequest('Params Required')
            }

        } catch (error) {
            next(error)
        }
    },

}

