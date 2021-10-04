import { ObjectID } from 'mongodb'
import { NextFunction, Request, Response } from 'express'
import { User } from '../../models'
import createHttpError from 'http-errors'

export default {
  profile: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { user } = req.session

      const response = await User.findById(user?.id).select('-password').lean()

      if (!response) throw new createHttpError.BadRequest('User Not Found')

      res.status(200).json({ response })
    } catch (error) {
      next(error)
    }
  },

  updateProfile: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { name, email, contactNumber, gender, avatar } = req.body

      const { user } = req.session

      const response = await User.findByIdAndUpdate(
        user?.id,
        {
          name,
          email,
          contactNumber,
          gender,
          avatar
        },
        { runValidators: true, new: true }
      ).select('-password')

      if (!response) throw new createHttpError.BadRequest('Failed to update')

      res.status(201).json(response)
    } catch (error) {
      next(error)
    }
  },

  follow: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { id } = req.params

      // check if the id is a valid one
      if (!ObjectID.isValid(id)) {
        return res.status(404).json({ error: 'Invalid ID' })
      }

      // check if your id doesn't match the id of the user you want to follow
      const userId = req.user?.id
      if (userId === req.params.id) {
        return res.status(400).json({ error: 'You cannot follow yourself' })
      }

      // add the id of the user you want to follow in following array
      const query = {
        _id: userId,
        following: { $not: { $elemMatch: { $eq: id } } }
      }

      const update = {
        $addToSet: { following: id }
      }

      const updated = await User.updateOne(query, update)

      // add your id to the followers array of the user you want to follow
      const secondQuery = {
        _id: id,
        followers: { $not: { $elemMatch: { $eq: userId } } }
      }

      const secondUpdate = {
        $addToSet: { followers: userId }
      }

      const secondUpdated = await User.updateOne(secondQuery, secondUpdate)

      if (!updated || !secondUpdated) {
        return res.status(404).json({ error: 'Unable to follow that user' })
      }

      res.status(200).json(update)
    } catch (error) {
      next(error)
    }
  },

  unfollow: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { id } = req.params

      // check if the id is a valid one
      if (!ObjectID.isValid(id)) {
        return res.status(404).json({ error: 'Invalid ID' })
      }

      // check if your id doesn't match the id of the user you want to unfollow
      const userId = req.user?.id
      if (userId === id) {
        return res.status(400).json({ error: 'You cannot unfollow yourself' })
      }

      // remove the id of the user you want to unfollow from following array
      const query = {
        _id: userId,
        following: { $elemMatch: { $eq: id } }
      }

      const update = {
        $pull: { following: id }
      }

      const updated = await User.updateOne(query, update)

      // remove your id from the followers array of the user you want to unfollow
      const secondQuery = {
        _id: id,
        followers: { $elemMatch: { $eq: userId } }
      }

      const secondUpdate = {
        $pull: { followers: userId }
      }

      const secondUpdated = await User.updateOne(secondQuery, secondUpdate)

      if (!updated || !secondUpdated) {
        return res.status(404).json({ error: 'Unable to unfollow that user' })
      }

      res.status(200).json(update)
    } catch (error) {
      next(error)
    }
  }
}
