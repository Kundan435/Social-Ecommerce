import express from 'express'
import publicRoute from './public'
import protectedRoute from './protected'
import authMiddleware from '../middleware/authMiddleware'

const route = express.Router()

route.use(publicRoute)
route.use(authMiddleware.isLoggedIn, protectedRoute)

export default route
