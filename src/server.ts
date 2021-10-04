import session from 'express-session'
import connectRedis from 'connect-redis'
import Redis from 'ioredis'
import dotenv from 'dotenv'
import 'colors'
import { REDIS_OPTIONS, APP_PORT, connectDB } from './config'
import { createApp } from './app'

(async () => {
    try {
        dotenv.config()

        connectDB()

        const RedisStore = connectRedis(session)

        const client = new Redis(REDIS_OPTIONS)

        const store = new RedisStore({ client })

        const app = createApp(store)

        app.use((req, res) => {
            res.locals.user = req.user
        })

        // const stream = client.scanStream()

        const stream = client.scanStream({
            match: "sess:*",
        })

        stream.on("data", (resultKeys) => {
            // `resultKeys` is an array of strings representing key names.
            // Note that resultKeys may contain 0 keys, and that it will sometimes
            // contain duplicates due to SCAN's implementation in Redis.
            for (let i = 0; i < resultKeys.length; i++) {
                console.log(resultKeys[i])
            }
        })
        stream.on("end", () => {
            console.log("all keys have been visited")
        })


        app.listen(APP_PORT, () => console.log(`http://localhost:${APP_PORT}`))
    } catch (e) {
        console.error(e, 'trigger')

    }
})()
