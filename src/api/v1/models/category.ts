import { Schema, model, Document } from 'mongoose'
import { Status } from '../interfaces'
import { IUser } from './user'

export interface ICategory extends Document {
  name: string
  iconImg: string
  coverImg: string
  slug: string
  description: string
  parentId: string
  status: string
  createdBy: IUser['_id']
}

const categorySchema: Schema<ICategory> = new Schema(
  {
    name: String,
    iconImg: String,
    coverImg: String,
    slug: String,
    description: String,
    parentId: String,
    status: {
      type: String,
      enum: Status,
      default: Status.draft
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    updatedAt: Date
  },
  { timestamps: true }
)

export const Category = model<ICategory>('Category', categorySchema)
