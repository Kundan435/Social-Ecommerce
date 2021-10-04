// import express, { Request, Response, NextFunction } from 'express'
// import morgan from 'morgan'
// import session, { Store } from 'express-session'
// import createHttpError from 'http-errors'
// import { SESSION_OPTIONS } from './config'
// import RoutesV1 from './api/v1/routes'
// import { ResponseError } from './api/v1/interfaces'
// // import { notFound, serverError, active } from './middleware'

// export const createApp = (store: Store) => {
//     const app = express()

//     app.disable('x-powered-by')
//     app.use(morgan('dev'))
//     app.use(express.json())
//     app.use(express.urlencoded({ extended: true }))

//     app.use(session({ ...SESSION_OPTIONS, store }))

//     // ####### PASSPORT JS

//     // app.use(passport.initialize())
//     // app.use(passport.session())
//     // require('./api/v1/utils/localAuth')(passport)

//     // app.use((req, res, next) => {
//     //   res.locals.user = req.user;
//     //   next();
//     // });

//     app.use('/api/v1', RoutesV1)

//     app.use(async (req, res, next) => {
//         next(new createHttpError.NotFound())
//     })

//     app.use((err: ResponseError, req: Request, res: Response, next: NextFunction) => {
//         res.status(err.status || 500)
//         res.send({
//             error: {
//                 status: err.status || 500,
//                 message: err.message,
//             },
//         })
//     })

//     return app
// }
