import { RedisOptions } from 'ioredis'

const REDIS_PORT = Number(process.env.REDIS_PORT)
const {REDIS_HOST} = process.env
const {REDIS_PASSWORD} = process.env

export const REDIS_OPTIONS: RedisOptions = {
    port: +REDIS_PORT,
    host: REDIS_HOST,
    password: REDIS_PASSWORD,
}
