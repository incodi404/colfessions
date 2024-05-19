import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    post: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    slug: {
        type: String
    },
    institution: {
        type: String
    }
}, {timestamps: true})

export const Post = mongoose.model("Post", postSchema)