import { model, Schema } from 'mongoose'
import { OrderStatus } from '../interfaces'
import { addressSchema, IAddressDetails } from './address'
import { IProduct } from './product'
import { IUser } from './user'

export interface IOrder extends Document {
  user: IUser['_id']
  products: Array<{
    productId: IProduct['_id']
    title: string
    thumbnail: string
    sku: string
    slug: string
    price: number
    quantity: number
    deliveryCharge: number
    tax: number
    discount: number
    deliveryEstimate: Date
    deliveryStatus: {
      type: OrderStatus
      date: Date
      completed: boolean
    }
    seller: {
      sellerId: IUser['_id']
      name: string
      slug: string
    }
  }>
  orderDate: Date
  billingAddress: IAddressDetails
  shippingAddress: IAddressDetails
  paymentType: string
  paymentStatus: string
  totalItems?: number
  totalDelivery?: number
  createdAt: Date
}

const orderSchema: Schema<IOrder> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        title: String,
        slug: String,
        thumbnail: String,
        sku: String,
        price: {
          type: Number,
          default: 0
        },
        seller: {
          sellerId: {
            type: Schema.Types.ObjectId,
            ref: 'Seller',
            required: true
          },
          name: String,
          slug: String
        },
        quantity: {
          type: Number,
          default: 0,
          required: true
        },
        deliveryCharge: {
          type: Number,
          default: 0
        },
        tax: {
          type: Number,
          default: 0
        },
        discount: {
          type: Number,
          default: 0
        },
        orderStatus: [
          {
            type: {
              type: String,
              enum: OrderStatus,
              default: OrderStatus.pending
            },
            date: {
              type: Date
            },
            completed: {
              type: Boolean,
              default: false
            }
          }
        ],
        _id: false
      }
    ],
    billingAddress: addressSchema,
    shippingAddress: addressSchema,
    orderDate: Date,
    paymentType: String,
    paymentStatus: String,
    invoice: String
  },
  { timestamps: true }
)

export const Order = model<IOrder>('Order', orderSchema)
