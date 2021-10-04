import {
    Schema, model, Document,
} from 'mongoose'
import { ImgRef } from '../interfaces'
import { IUser } from './user'

interface ImgInterface {
    filename: string,
    originalname: string,
    mimetype: string,
    path: string,
    size: number
}

export interface IImage extends Document {
    // _id: mongoose.Types.ObjectId,
    uploadedBy: IUser['_id']
    type: string,
    refId: string,
    mainImg: ImgInterface,
    images: Array<[ImgInterface]>

}

const ImgFormat = {
    filename: String,
    originalname: String,
    mimetype: String,
    path: String,
    size: Number
}

const productImg: Schema<IImage> = new Schema({

    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    type: {
        type: String,
        enum: ImgRef
    },
    refId: { type: Schema.Types.ObjectId, required: false },
    mainImg: [{
        og: { ImgFormat },
        sm: { ImgFormat },
        lg: { ImgFormat }
    }],
}, { timestamps: true })


export const Image = model<IImage>('Image', productImg)
