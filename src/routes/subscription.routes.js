const{ Router } = require("express")
const{
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
} = require("../controllers/subscription.controller.js")
const { verifyJWT } = require ("../middlewares/auth.middleware.js")

const router = Router()

router.use(verifyJWT)
router.route("/c/:channelId").post(toggleSubscription)
router.route("/c/:channelId/subscribers").get(getUserChannelSubscribers)
router.route("/u/:subscriberId").get(getSubscribedChannels)
module.exports = router;