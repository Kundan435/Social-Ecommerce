import { model, Schema } from 'mongoose'
import { IProduct } from './product'
import { IUser } from './user'

export interface IWishlist extends Document {
  user: IUser['_id']
  wishlist: Array<IProduct['_id']>
}

const wishlistSchema: Schema<IUser> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    items: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
  },
  {
    timestamps: true
  }
)

export const Wishlist = model<IWishlist>('Wishlist', wishlistSchema)
