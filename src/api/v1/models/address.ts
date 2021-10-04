import { model, Schema, Types, Document } from 'mongoose'
import { AddressType } from '../interfaces'
import { IUser } from './user'

export interface IAddressDetails {
  _id?: Types.ObjectId
  name: string
  mobileNumber: string
  addressDetails: string
  city: string
  state: string
  country: string
  pincode: string
  addressType: string
}

export interface IAddress extends Document {
  _id?: Types.ObjectId
  user: IUser['_id']
  defaultAddress: IAddressDetails
  address: Array<IAddressDetails>
}

export const addressSchema: Schema<IAddressDetails> = new Schema({
  name: String,
  mobileNumber: String,
  addressDetails: String,
  city: String,
  state: String,
  country: String,
  pincode: String,
  addressType: {
    type: String,
    enum: AddressType,
    required: true
  }
})

const userAddressSchema: Schema<IAddress> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    defaultAddress: { type: Schema.Types.ObjectId, ref: 'AddressDetails' },
    address: [addressSchema]
  },
  { timestamps: true }
)

model<IAddressDetails>('AddressDetails', addressSchema)

export const userAddress = model<IAddress>('Address', userAddressSchema)
