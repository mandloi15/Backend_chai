const dotenv = require("dotenv")
const connectDB = require('./db/index.js')
const app = require('./app.js')

dotenv.config()


connectDB()
.then(() => {
    app.listen(process.env.port || 3000,() => {
        console.log(`Server is running on port ${process.env.PORT || 3000}`)
    })
})
.catch((err) => {
    console.log("Error connecting to MongoDB:", err)
})










/*
const express = require("express")
const app = express()

( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`, )
        app.on("error",(error) => {
            console.error("Error connecting to MongoDB:", error)
        })

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    } catch (err) {
        console.error("Error connecting to MongoDB:", err)
        throw err
    }
})
*/
