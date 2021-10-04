import { model, Schema } from 'mongoose'
import { IProduct } from './product'
import { IUser } from './user'

export interface ICartItem {
  product: IProduct['_id']
  quantity: number
}

export interface ICart extends Document {
  user: IUser['_id']
  items: Array<ICartItem>
}

const cartSchema: Schema<ICart> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number, default: 1 },
        _id: false
      }
    ]
  },
  { timestamps: true }
)

export const Cart = model<ICart>('Cart', cartSchema)
