import {asynchandler} from "../utils/asynchandler.utils.js"
import {Follow} from "../models/follow.model.js"
import { ApiError } from "../utils/ApiError.utils.js"
import { ApiResponse } from "../utils/ApiResponse.utils.js"

const follow = asynchandler(async(req, res)=>{
    const {institution} = req.body
    const user = req.user

    if(!user || !institution) {return res.status(400).json(ApiError(400, "Institution and user is required!"))}

    const followed = await Follow.create({
        instituition: institution.toLowerCase(),
        userId: user?._id
    }) 

    if(!followed) {return res.status(500).json(ApiError(500, "Follow request failed!"))}

    return res.status(200).json(ApiResponse(200, "Follow successfull!"))
}) 

const unfollow = asynchandler(async(req,res)=>{
    const {institution} = req.body
    const user = req.user

    if(!user || !institution) {return res.status(400).json(ApiError(400, "Institution and user is required!"))}

    const unfollowed = await Follow.deleteMany({instituition: institution.toLowerCase(), userId: user?._id})

    if(!unfollowed) {return res.status(500).json(ApiError(500, "Unfollow request failed!"))}

    return res.status(200).json(ApiResponse(200, "Unfollow successfull!"))
})

export {
    follow,
    unfollow
}