// import { Request, Response, NextFunction } from 'express'
// import createHttpError from 'http-errors'
// import { isLoggedIn } from '../helpers/auth'
// // import { BadRequest, Unauthorized } from '../errors'
// // import { SESSION_ABSOLUTE_TIMEOUT } from '../config'
// // import { catchAsync } from './errors'

// export const guest = (req: Request, res: Response, next: NextFunction) => {

//     if (req.session.userId) {
//         throw new createHttpError.BadRequest('You are already loggedIn')
//     }
//     next()

//     // export const isLoggedIn = (req: Request) => req.session.userId

//     //     let session

//     //     if (req.session.userId){
//     // try{

//     // } catch(error){
//     //     console.log(error)
//     // }
//     //     }
//     //     next()
// }

// export const auth = (req: Request, res: Response, next: NextFunction) => {
//     if (!req.session.userId) {
//         return next(new createHttpError.Unauthorized('You must be logged in'))
//     }
//     next()
// }

// export const admin = (req: Request, res: Response, next: NextFunction) => {
//     if (req.session.role !== "admin") {
//         return res.status(400).json({ message: "Admin access denied" });
//     }
//     next()
// }

// // export const active  = catchAsync(
// //   async (req: Request, res: Response, next: NextFunction) => {
// //     if (isLoggedIn(req)) {
// //       const now = Date.now()
// //       const { createdAt } = req.session as Express.Session

// //       if (now > createdAt + SESSION_ABSOLUTE_TIMEOUT) {
// //         await logOut(req, res)

// //         return next(new Unauthorized('Session expired'))
// //       }
// //     }

// //     next()
// //   }
// // )
