const mongoose = require('mongoose')
const { Schema } = mongoose
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate')

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, // cloudinary url
            required: true,
        },
        thumbnail: {
            type: String, // cloudinary url
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        duration: {
            type: Number, // in seconds
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owener: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }

)


videoSchema.plugin(mongooseAggregatePaginate)

module.exports = { Video: mongoose.model("Video", videoSchema) }