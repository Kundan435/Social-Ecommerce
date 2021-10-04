// import { Request } from 'express'
// import { IUser } from '../models'

export interface ResponseError extends Error {
  status?: number
}


// declare namespace Express {
//     export interface Request {
//         user?: string
//     }
// }

// declare global {
//     namespace Express {
//         interface Request {
//             userId?: string;
//         }
//     }
// }

// declare module "express" {
//   export interface Request {
//     user?: string
//   }
// }
