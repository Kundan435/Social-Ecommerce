// import mongoose from 'mongoose'
// import session from 'express-session'
// import connectRedis from 'connect-redis'
// import Redis from 'ioredis'
// import dotenv from 'dotenv'
// import 'colors'
// import { REDIS_OPTIONS, APP_PORT, connectDB, SESSION_NAME } from './config'
// import { createApp } from './app'

// (async () => {
//     try {

//         dotenv.config()

//         connectDB()

//         const RedisStore = connectRedis(session)

//         const client = new Redis(REDIS_OPTIONS)

//         const store = new RedisStore({ client })

//         const app = createApp(store)

//         app.use((req, res, next) => {
//             res.locals.user = req.user;
//             next();
//         });

//         app.listen(APP_PORT, () => console.log(`http://localhost:${APP_PORT}`))

//     } catch (e) {

//         console.error(e)

//     }
// })()
