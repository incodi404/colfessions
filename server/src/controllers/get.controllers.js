import { asynchandler } from "../utils/asynchandler.utils.js"
import { ApiError } from "../utils/ApiError.utils.js"
import { ApiResponse } from "../utils/ApiResponse.utils.js"
import { User } from "../models/user.model.js"
import { Follow } from "../models/follow.model.js"
import mongoose from "mongoose"

const newsFeed = asynchandler(async (req, res) => {
    const user = req.user

    if (!user) { return res.status(400).json(ApiError(400, "User not found!")) }

    const posts = await Follow.aggregate([
        {
            '$match': {
                'userId': new mongoose.Types.ObjectId(user?._id)
            }
        }, {
            '$lookup': {
                'from': 'posts',
                'localField': 'instituition',
                'foreignField': 'institution',
                'as': 'posts'
            }
        }, {
            '$lookup': {
                'from': 'users',
                'localField': 'posts.userId',
                'foreignField': '_id',
                'as': 'user'
            }
        }, {
            '$addFields': {
                'post_user': {
                    '$first': '$user'
                }
            }
        }, {
            '$unwind': {
                'path': '$posts'
            }
        }, {
            '$project': {
                'post_user': {
                    'fullname': 0,
                    'username': 0,
                    'password': 0,
                    'refreshToken': 0,
                    'email': 0,
                    'isAdmin': 0
                },
                'user': 0
            }
        },
        {
            '$sort': {
                'createdAt': -1
            }
        }
    ])

    //if(!posts) {return res.status(500).json(ApiError(500, "Post fetch failed"))}

    return res.status(200).json(ApiResponse(200, "Post fetched!", posts))
})

const institutionList = asynchandler(async (req, res) => {
    const user = req.user

    if (!user) { return res.status(400).json(ApiError(400, "User not found!")) }

    const list = await User.aggregate([
        {
            '$group': {
                '_id': '$institution'
            }
        }
    ])

    if (!list) { return res.status(500).json(ApiError(500, "List not found!")) }

    return res.status(200).json(ApiResponse(200, "List fetched!", list))

})

export {
    newsFeed,
    institutionList
}