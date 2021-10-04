import { Request, Response } from 'express'

import { SESSION_NAME } from '../../../config'
// import { UserDocument } from './models'

declare module 'express-session' {
    interface SessionData {
        user: {
            id: string,
            role: string,
            createdAt: number
        }
    }
}

// export const isLoggedIn = (req: Request, next: NextFunction) => {
//     if(!req.session.user) throw new createHttpError.Unauthorized('You are not logged In')
//     next()
// }

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const logIn = (req: Request, userId: string, userRole: string) => {
    req.session.user = {
        id: userId,
        role: userRole,
        createdAt: Date.now()
    }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const logOut = (req: Request, res: Response) => new Promise<void>((resolve, reject) => {
    req.session?.destroy((err: Error) => {
        if (err) reject(err)

        res.clearCookie(SESSION_NAME)

        resolve()
    })
})

// export const markAsVerified = async (user: UserDocument) => {
//   user.verifiedAt = new Date()
//   await user.save()
// }

// export const resetPassword = async (user: UserDocument, password: string) => {
//   user.password = password
//   await user.save()
// }
