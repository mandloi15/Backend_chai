const { Router } = require( "express")
const { verifyJWT } = require("../middlewares/auth.middleware.js")
const {
    getChannelStats,
    getChannelVideos,
} = require ("../controllers/dashboard.controller.js")

const router = Router()

router.use(verifyJWT)
router.route("/stats").get(getChannelStats)
router.route("/videos").get(getChannelVideos)

module.exports = router