import dotenv from 'dotenv'

dotenv.config()

const {NODE_ENV} = process.env

const APP_PORT = process.env.APP_PORT || 4000
const {APP_HOSTNAME} = process.env
const {APP_PROTOCOL} = process.env

// const APP_SECRET = '4d2ca599b4189f74a771f44b8a8d06f572208b5649f5ae216f8e94612a267ff0'

const APP_ORIGIN = `${APP_PROTOCOL}://${APP_HOSTNAME}:${APP_PORT}`

const IN_PROD = NODE_ENV === 'production'

export { APP_PORT, APP_ORIGIN, IN_PROD }
