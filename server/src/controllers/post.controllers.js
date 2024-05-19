import { ApiError } from "../utils/ApiError.utils.js"
import {asynchandler} from "../utils/asynchandler.utils.js"
import { v4 as uuidv4 } from "uuid"
import { Post } from "../models/post.model.js"
import { ApiResponse } from "../utils/ApiResponse.utils.js"

const createPost = asynchandler(async(req,res)=>{
    const {inputPost} = req.body

    if(!inputPost) {return res.status(400).json(ApiError(400, "Post is required!"))}

    const user = req.user

    let slug = uuidv4()

    if(!slug) {return res.status(500).json(ApiError(500, "Slug generate failed!"))}

    //check if slug is already used

    let existedSlug = await Post.findOne({slug: slug})

    //generate slug until find a unique slug

    while(existedSlug) {
        slug = uuidv4()
        existedSlug = await Post.findOne({slug: slug})
    }

    const post = await Post.create({
        post: inputPost,
        userId: user?._id,
        slug: slug,
        institution: user.institution
    })

    if(!post) {return res.status(500).json(ApiError(500, "Post save failed!"))}

    return res
        .status(200)
        .json(ApiResponse(200, "Post successfull!", post))

})

const deletePost = asynchandler(async(req,res)=>{
    const {slug} = req.body

    if(!slug) {return res.status(400).json(ApiError(400, "Slug is required!"))}

    const user = req.user

    if(!user) {return res.status(400).json(ApiError(400, "User not found!"))}
    
    const deletedPost = await Post.deleteMany({userId: user?._id, slug: slug})

    if(!deletedPost) {return res.status(500).json(ApiError(500, "Delete post failed!"))}

    if(deletedPost.deletedCount === 0) {return res.status(400).json(ApiError(400, "Username or slug is wrong!"))}

    return res.status(200).json(ApiResponse(200, "Post delete successfull!"))
})

const updatePost = asynchandler(async(req,res)=>{
    const {slug, post} = req.body

    const user = req.user

    if(!user) {return res.status(400).json(ApiError(400, "User not found!"))}

    if(!slug || !post) {return res.status(400).json(ApiError(400, "Slug and updated post is required"))}

    const updatedPost = await Post.updateMany({userId: user?._id, slug: slug}, {post: post})

    if(updatedPost.modifiedCount === 0) {return res.status(400).json(ApiError(400, "User or slug is wrong!"))}

    return res.status(200).json(ApiResponse(200, "Your post is updated!", updatedPost))
})

export {
    createPost,
    deletePost,
    updatePost
}