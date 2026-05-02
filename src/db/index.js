const mongoose = require('mongoose')
const { DB_NAME } = require('../constants.js')

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`)
        console.log(`MongoDB connected: ${connectionInstance.connection.host}`)
    } catch (err) {
        console.error("Error connecting to MongoDB:", err)
        process.exit(1) // Exit the process with an error code
    }
}

module.exports = connectDB
