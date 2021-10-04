import mongoose, { Schema, model, Document } from 'mongoose'
import { Status } from '../interfaces'
import { ICategory } from './category'
import { IUser } from './user'

interface imgInterface {
  filename: string
  path: string
  size: number
}

export enum WeightUnits {
  kg = 'kg',
  lb = 'lb'
}

export enum SizeUnits {
  cm = 'cm',
  inch = 'inch',
  foot = 'foot'
}

export interface IProduct extends Document {
  _id: mongoose.Types.ObjectId
  title: string
  mywork: boolean
  original: boolean
  artist: string
  slug: string
  price: number
  description: string
  images: [imgInterface]
  highlights: Array<{ title: string; value: string }>
  stockQty: number
  category: ICategory['_id']
  weight: {
    unit: WeightUnits
    value: number
  }
  dimensions: {
    l: number
    w: number
    h: number
    units: SizeUnits
  }
  deliveryCharge: {
    domestic: number
    international: number
  }
  returns: {
    domestic: boolean
    international: boolean
  }
  certificate: boolean
  sku: string
  status: string
  seller: IUser['_id']
}

const imgFormat = {
  filename: String,
  path: String,
  size: Number,
  mimeType: String
}

const productSchema: Schema<IProduct> = new Schema(
  {
    title: String,
    mywork: Boolean,
    original: Boolean,
    artist: String,
    slug: String,
    price: Number,
    description: String,
    images: [imgFormat],
    highlights: [{ title: String, value: String, _id: false }],
    weight: {
      unit: { type: String, enum: WeightUnits, default: WeightUnits.kg },
      value: Number
    },
    dimensions: {
      l: Number,
      w: Number,
      h: Number,
      unit: { type: String, enum: SizeUnits, default: SizeUnits.inch }
    },
    origin: String,
    deliveryCharge: Number,
    returns: Boolean,
    certificate: Boolean,
    sku: String,
    stockQty: {
      type: Number,
      default: 0
    },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    status: {
      type: String,
      enum: Status,
      default: Status.draft
    },
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
)

export const Product = model<IProduct>('Product', productSchema)
