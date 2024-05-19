import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { asynchandler } from "../utils/asynchandler.utils.js";
import {Comment} from "../models/comment.model.js"
import { ApiResponse } from "../utils/ApiResponse.utils.js";

const createComment = asynchandler(async(req,res)=>{
    const {comment, slug} = req.body

    const user = req.user

    if(!user || !comment || !slug) {return res.status(400).json(ApiError(400, "Comment, slug and user is required!"))}

    const post = await Post.findOne({slug: slug})

    if(!post) {return res.status(400).json(ApiError(400, "Post not found!"))}

    const commmented = await Comment.create({
        comment: comment,
        slug: slug,
        userId: user?._id
    })

    if(!commmented) {return res.status(500).json(ApiError(500, "Comment failed!"))}

    return res.status(200).json(ApiResponse(200, "Comment successfull!"))
})

const deleteComment = asynchandler(async(req,res)=>{
    const {commentId} = req.body

    if(!commentId) {return res.status(400).json(ApiError(400, "Comment id is required!"))}

    const user = req.user

    if(!commentId) {return res.status(400).json(ApiError(400, "Comment id is required!"))}

    const deletedComment = await Comment.deleteMany({userId: user?._id, _id: commentId})

    if(!deletedComment) {return res.status(500).json(ApiError(500, "Comment delete failed!"))}

    if(deletedComment.deletedCount === 0) {return res.status(403).json(ApiError(403, "Unauthorized action!"))}

    return res.status(200).json(ApiResponse(200, "Comment deleted!", deletedComment))
})

export {
    createComment,
    deleteComment
}