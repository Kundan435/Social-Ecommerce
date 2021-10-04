import { ensureLoggedOut } from 'connect-ensure-login'
import express from 'express'
import passport from 'passport'
import { adminController, userController } from '../controller'
import { authMidddleware } from '../middleware'

const router = express.Router()

router.post('/register', authMidddleware.guest, userController.auth.register)

router.post('/login', authMidddleware.guest, userController.auth.login)

router.get('/check', userController.auth.check)

router.delete('/logout', authMidddleware.isLoggedIn, userController.auth.logout)

router.post(
  '/login1',
  ensureLoggedOut({ redirectTo: '/' }),
  passport.authenticate('local', {
    // successRedirect: '/',
    successReturnToOrRedirect: '/',
    failureRedirect: '/auth/login'
  })
)

router.get('/admin/product/get', adminController.Product.getAll)

router.get('/artwork/:productSlug', userController.product.getProductsBySlug)

export default router
