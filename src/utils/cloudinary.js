const cloudinary = require('cloudinary').v2
const { response } = require('express')
const fs = require('fs')


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLUDE_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadToCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        // Upload the file to Cloudinary
        cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        })
        //file delete after upload
        console.log('File uploaded successfully to Cloudinary', response.url)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload failed
        return null
    }
}

module.exports = {
    uploadToCloudinary
}