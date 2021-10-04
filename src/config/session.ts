import { SessionOptions } from 'express-session'
import { IN_PROD } from './app'

const ONE_HOUR = 1000 * 60 * 60

// const THIRTY_MINUTES = ONE_HOUR / 2

const SIX_HOURS = ONE_HOUR * 6

const SESSION_SECRET = String(process.env.SESS_SECRET)
const SESSION_NAME = String(process.env.SESS_NAME)
const SESSION_IDLE_TIMEOUT = SIX_HOURS

const SESSION_ABSOLUTE_TIMEOUT = +(
  process.env.SESS_ABSOLUTE_TIMEOUT || SIX_HOURS
)

const SESSION_OPTIONS: SessionOptions = {
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  cookie: {
    maxAge: +SESSION_IDLE_TIMEOUT,
    secure: IN_PROD,
    httpOnly: true,
    sameSite: false
  },
  rolling: true,
  resave: false,
  saveUninitialized: false
}

export { SESSION_ABSOLUTE_TIMEOUT, SESSION_OPTIONS, SESSION_NAME }
