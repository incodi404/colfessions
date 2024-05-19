import mongoose, {Schema} from "mongoose";

const commentSchema = new Schema({
    comment: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    slug: String
}, {timestamps: true})

export const Comment = mongoose.model("Comment", commentSchema)