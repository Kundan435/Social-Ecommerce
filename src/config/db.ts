import mongoose from 'mongoose'
import { IN_PROD } from './app'

const { MONGO_USERNAME } = process.env
const { MONGO_PASSWORD } = process.env
const { MONGO_HOST } = process.env
const { MONGO_PORT } = process.env
const { MONGO_DATABASE } = process.env

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const MONGO_URI = IN_PROD ? `mongodb://${MONGO_USERNAME}:${encodeURIComponent(MONGO_PASSWORD!)}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`
    : `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`

const connectDB = async (): Promise<void> => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const conn = await mongoose.connect(MONGO_URI!, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        // eslint-disable-next-line no-console
        console.log(`Database Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export { connectDB }
