import { Schema, model, Document, Model } from 'mongoose'
import { hash, compare } from 'bcryptjs'
import createHttpError from 'http-errors'
import { BCRYPT_WORK_FACTOR } from '../../../config'
import { Gender, Role, userStatus } from '../interfaces'
// import { createHash, createHmac, timingSafeEqual } from 'crypto'
// import { BCRYPT_WORK_FACTOR, APP_SECRET, EMAIL_VERIFICATION_TIMEOUT, APP_ORIGIN } from '../config'

export interface IUser extends Document {
  // _id: mongoose.Types.ObjectId,
  name: string
  username: string
  gender: Gender
  avatar: string
  email: string
  role: string
  status: userStatus
  online: boolean
  contactNumber: number
  country: string
  password: string
  verifiedAt: Date
  following: Array<IUser['_id']>
  matchesPassword: (password: string) => Promise<boolean>
  // matchesPassword(password: string): Promise<boolean>;
  // matchesPassword(password: string, next: (err: Error | null, same: boolean | null) => void): void;

  verificationUrl: () => string
}

interface UserModel extends Model<IUser> {
  signVerificationUrl: (url: string) => string
  hasValidVerificationUrl: (path: string, query: any) => boolean
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User {
      user?: string
      id?: string
      _id?: string
      role?: string
      // Add whatever you're missing
    }
  }
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: String,
    username: String,
    avatar: {
      type: String,
      default: '/1.jpg'
    },
    email: String,
    gender: {
      type: String,
      enum: Gender
    },
    status: {
      type: String,
      enum: userStatus,
      default: userStatus.active
    },
    online: {
      type: Boolean,
      default: false
    },
    country: String,
    role: {
      type: String,
      enum: Role,
      default: Role.user
    },
    contactNumber: Number,
    password: String,
    verifiedAt: Date,
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      this.password = await hash(this.password, BCRYPT_WORK_FACTOR)
    }
    next()
  } catch (error) {
    next(error)
  }
})

userSchema.methods.matchesPassword = async function (password: string) {
  try {
    return await compare(password, this.password)
  } catch (error) {
    throw new createHttpError.InternalServerError(error.message)
  }
}

// userSchema.methods.verificationUrl = function () {
//   const token = createHash('sha1').update(this.email).digest('hex')
//   const expires = Date.now() + EMAIL_VERIFICATION_TIMEOUT

//   const url = `${APP_ORIGIN}/email/verify?id=${this.id}&token=${token}&expires=${expires}`
//   const signature = User.signVerificationUrl(url)

//   return `${url}&signature=${signature}`
// }

// userSchema.statics.signVerificationUrl = (url: string) =>
//   createHmac('sha256', APP_SECRET).update(url).digest('hex')

// userSchema.statics.hasValidVerificationUrl = (path: string, query: any) => {
//   const url = `${APP_ORIGIN}${path}`
//   const original = url.slice(0, url.lastIndexOf('&'))
//   const signature = User.signVerificationUrl(original)

//   return timingSafeEqual(Buffer.from(signature), Buffer.from(query.signature)) && +query.expires > Date.now()
// }

// userSchema.set('toJSON', {
//   transform: (doc, { __v, password, ...rest }, options) => rest
// })

export const User = model<IUser, UserModel>('User', userSchema)
