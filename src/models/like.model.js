const mongoose = require("mongoose")

const likeSchema = new Schema({
    video: {
        type:Schema.Types.ObjectId,
        ref: "Video"
    },
    comment: {
        type:Schema.Types.ObjectId,
        ref: "Comment"
    },
    owner: {
        type:Schema.Types.ObjectId,
        ref: "User"
    },
    tweet: {
        type:Schema.Types.ObjectId,
        ref: "Tweet"
    },
    likedby: {
        type:Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true})