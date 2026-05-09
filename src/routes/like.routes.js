const { Router } = require("express")
const { verifyJWT } = require("../middlewares/auth.middleware.js")
const{
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
} = require("../controllers/like.controller.js")

const router = Router()
router.use(verifyJWT)
router.route("/toggle/v/:videoId").post(toggleVideoLike)
router.route("/toggle/c/:commentId").post(toggleCommentLike)
router.route("/toggle/t/:tweetId").post(toggleTweetLike)
router.route("/videos").get(getLikedVideos)

module.exports = router