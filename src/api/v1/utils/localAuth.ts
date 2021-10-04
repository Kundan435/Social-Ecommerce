import { NativeError } from 'mongoose'
import passport from 'passport'
import passportLocal from 'passport-local'
import { IUser, User } from '../models'

const LocalStrategy = passportLocal.Strategy

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (_req, email, password, done) => {
            try {
                // await loginSchema.validateAsync(({ email, password }), { abortEarly: false })

                const user = await User.findOne({ email })
                // Username/email does NOT exist
                if (!user) {
                    return done(null, false, { message: 'Incorrect Email / Password' })
                }
                // Email exist and now we need to verify the password
                const isMatch = await user.matchesPassword(password)
                return isMatch
                    ? done(null, user)
                    : done(null, false, { message: 'Incorrect Email / Password' })
            } catch (error) {
                // if (error.isJoi === true)
                //   error.status = 422
                // error.message = 'Incorrect Email or Password'
                done(error)
            }
        },
    ),
)

// exporting a wrapper function that will invoke the passport.authenticate method
// export default {
// export const localLogin = (req: any, res: any, next: any) => {
//   const { email, password } = req.body;

//   // if email or password are missing, send an error back to the client
//   if (!email || !password) return sendError(badCredentials, res);

//   passport.authenticate('local', (err, user) => {
//     // if an error was returned by the strategy, send it to the client
//     if (err) return sendError(err, res);

//     // manually setting the logged in user to req.user
//     // optionally, you can set it to "req.session" if you're using some sort of session
//     req.user = user;

//     // invoking "next" to continue to the controller
//     next();
//   })(req, res, next);
// }

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, cb) => {
    User.findById(id, (err: NativeError, user: IUser) => {
        // done(err, user)
        const userInformation: any = {
            name: user.name,
            username: user.username,
            id: user.id,
            role: user.role
        }
        cb(err, userInformation)
    })
})
