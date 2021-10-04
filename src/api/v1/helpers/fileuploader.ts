// TODO: 
// Optimize the code and try to make response time less on img upload

import createHttpError from 'http-errors'
import multer from 'multer'
import { nanoid } from 'nanoid'
import path from 'path'
// import express, { NextFunction, Request, Response } from 'express'
// import { Image } from '../models'

const storage = multer.diskStorage({
    destination(_req, _file, cb) {
        cb(null, path.join(path.dirname('api'), 'uploads'))
    },
    filename(_req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${nanoid(15)}${path.extname(file.originalname)}`,
        )
    },
})

function checkFileType(file: Express.Multer.File, cb: multer.FileFilterCallback) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        return cb(null, true)
    }
    cb(
        new createHttpError.BadRequest('Allowed only .png, .jpg, .jpeg'),
    )
}

const upload = multer({
    storage,
    fileFilter(_req, file, cb) {
        checkFileType(file, cb)
    },
})

export default upload

// const router = express.Router()


////////////////////////////////////////////////////////////////

// router.post('/uploads', upload.array('image'), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {

//         res.status(200).json({ file: req.files, body: req.body })

// let uploadedFile = []

// if (req.files && req.files.length > 0) {
//     uploadedFile = (req.files as any).map((file: any) => {
//         return {
//             uploadedBy: '609982fd0440190110821c8e',
//             filename: file.filename,
//             originalname: file.originalname,
//             mimetype: file.mimetype,
//             path: file.path,
//             size: file.size
//         }
//     })
// }

// const newImgDoc = await Image.insertMany(uploadedFile)
// if (!newImgDoc) {
//     throw new createHttpError.BadRequest('Failed to upload')
// }
// res.status(200).json(newImgDoc)

//////////////////////////////////////////////////////////////////
// let images = []

// if (req.files && req.files.length > 0) {
//     images = (req.files as any).map((file: { filename: any }) => {
//         return { img: file.filename }
//     })
// }

// const userId = "609982fd0440190110821c8e"

// const oldImages = await Image.findOne({uploadedBy: userId, count: {$lt: 5 }}).lean()

// if(!userId) throw new createHttpError.Unauthorized('Unauthorized, Please login!')

// if(userId && !oldImages){

//     const newUploader: IImage = new Image({
//         uploadedBy: userId,
//         count: images.length,
//         images,
//     }) 

//     const newImgDoc = await newUploader.save()
//     if (!newImgDoc) {
//         throw new createHttpError.BadRequest('Failed to upload')
//     }
//     res.status(200).json(newImgDoc)
// }
// if(userId && oldImages){

//     const options = {new: true}
//     const remainingSpace = 5 - oldImages.count
//     const imgSent = images.length

//     if(remainingSpace >= imgSent){

//         const imgCount = oldImages.count + images.length

//         const oldImgDoc = await Image.findOneAndUpdate(
//             {_id: oldImages._id}, {
//                 $set: {count: imgCount },
//                 $push: {
//                     images
//                 }
//             },
//             options)

//         res.status(200).json(oldImgDoc)               
//     } 

//     if(remainingSpace < imgSent) {

//         const newUploader: IImage = new Image({
//             uploadedBy: userId,
//             count: images.length,
//             images,
//         })

//         const newImgDoc = await newUploader.save()
//         if (!newImgDoc) {
//             throw new createHttpError.BadRequest('Failed to upload')
//         }
//         res.status(200).json(newImgDoc)

//     }


//     } catch (error) {
//         if (error.isJoi === true) error.status = 422
//         next(error)
//     }
// })

// export default router
