import Joi from 'joi'

const name = Joi.string().min(3).max(128).trim().required()

const artist = Joi.string().min(3).max(128).trim().required()

const price = Joi.number().min(0).required()

const description = Joi.string().trim().max(5000).required()

const stockQty = Joi.number().min(0).required()

const status = Joi.string().required()

export const productValidate = Joi.object({
    name,
    artist,
    price,
    description,
    stockQty,
    status
})