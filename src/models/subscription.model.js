const mongoose, {Schema} = require('mongoose')

const subscriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId, // User who is subscribing
        ref: 'User',
    },
    channel: {
        type: Schema.Types.ObjectId, // User who is being subscribed to (the channel)
        ref: 'User',
    }
},{timestamps: true})



export const Subscription = mongoose.model('Subscription', subscriptionSchema)