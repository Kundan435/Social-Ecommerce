import express from 'express'
import adminRoute from './admin'
import userRoute from './user'
const route = express.Router()

route.use('/admin', adminRoute)

route.use(userRoute)

export default route
