import express from 'express'
import { adminController } from '../../controller'
import { upload } from '../../helpers'

const router = express.Router()

// Users

router.get('/users', adminController.User.getAll)

router.get('/user/:id', adminController.User.getById)

router.patch('/user/:id', adminController.User.updateUser)

router.delete('/user/:id', adminController.User.delete)

router.get('/getUser', adminController.User.kickUser)

// Seller

router.patch('/seller/:id', adminController.User.updateSeller)

// Category

router.post('/category/create', adminController.Category.create)

router.patch('/category/edit/:updateCatId', adminController.Category.update)

router.get('/category/get', adminController.Category.getAll)

router.patch('/category/delete', adminController.Category.delete)

// Product

router.post('/product/create', adminController.Product.create)

router.put(
  '/product/:updateProductId/edit/:method?/:img_id?',
  upload.fields([
    {
      name: 'thumbnail',
      maxCount: 1
    },
    {
      name: 'images',
      maxCount: 10
    }
  ]),
  adminController.Product.update
)

router.get('/product/get', adminController.Product.getAll)

router.get('/product/id/:productId', adminController.Product.getById)

router.delete(
  '/product/delete/:productDeleteId',
  adminController.Product.delete
)

export default router
