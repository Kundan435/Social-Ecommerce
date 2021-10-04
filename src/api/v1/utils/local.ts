// import passport from 'passport'
// import passportLocal from 'passport-local'

// // reusable func to return errors to client
// const sendError = (err, res) => res.status(400).json({ err: err.toString() })

// const badCredentials = 'There was a problem with your login credentials. Please make sure your username and password are correct.'

// const LocalStrategy = passportLocal.Strategy

// passport.use(
//     new LocalStrategy(
//         {
//             usernameField: 'email',
//             passwordField: 'password',
//             passReqToCallback: true,
//         },
//         async (req, email, password, done) => {
//             try {
//                 // check to see if the user already exists
//                 const existingUser = await User.findOne({ email })
//                 if (!existingUser) return done(badCredentials, false)

//                 // compare password to existingUser password
//                 const validPassword = await bcrypt.compare(
//                     password,
//                     existingUser.password,
//                 )
//                 if (!validPassword) return done(badCredentials, false)

//                 return done(null, existingUser)
//             } catch (err) {
//                 return done(err, false)
//             }
//         },
//     ),
// )
