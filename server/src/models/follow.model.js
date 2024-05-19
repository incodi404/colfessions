import mongoose, {Schema} from "mongoose"

const followSchema = new Schema({
    instituition: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

export const Follow = mongoose.model('Follow', followSchema)
