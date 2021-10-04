import { Schema, model, Document } from 'mongoose'
import { IUser } from './user'

export enum SellerType {
  artist = 'artist',
  dealer = 'dealer'
}

export interface ISeller extends Document {
  seller: IUser['_id']
  sellerType: SellerType
  billingAddress: {
    address: string
    country: string
    state: string
    city: string
    pincode: string
  }
  commission: number
  totalArtworks: number
  totalFollowers: number
  rating: number
  totalSales: number
}

const sellerSchema: Schema<ISeller> = new Schema(
  {
    seller: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    sellerType: {
      type: String,
      enum: SellerType
    },
    billingAddress: {
      address: String,
      country: String,
      state: String,
      city: String,
      pincode: String
    },
    totalArtworks: { type: Number, default: 0 },
    totalFollowers: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    totalSales: { type: Number, default: 0 }
  },
  { timestamps: true }
)

export const Seller = model<ISeller>('Seller', sellerSchema)
