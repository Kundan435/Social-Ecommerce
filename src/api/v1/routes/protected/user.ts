import express from 'express'
import { userController } from '../../controller'

const router = express.Router()

// #### User
router.post('/register-seller', userController.seller.register)

router.get('/profile', userController.user.profile)

router.patch('/profile/edit', userController.user.updateProfile)

router.patch('/follow/:id', userController.user.follow)

router.patch('/unfollow/:id', userController.user.unfollow)

router.get('/wishlist', userController.wishlist.Get)

router.patch('/wishlist', userController.wishlist.Add)

router.delete('/wishlist/:id?', userController.wishlist.Delete)

router.get('/cart', userController.cart.get)

router.patch('/cart', userController.cart.add)

router.delete('/cart/:id?', userController.cart.empty)

router.post('/order', userController.order.add)

router.get('/order', userController.order.get)

router.get('/order/:id/:product?', userController.order.getById)

router.route('/basicinfo').get(userController.basic.basicInfo)

router
  .route('/address')
  .get(userController.address.get)
  .patch(userController.address.addUpdate)
  .delete(userController.address.delete)

export default router
