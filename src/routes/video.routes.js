const{ Router } = require("express")
const {
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus,
    getAllVideos
} = require("../controllers/video.controller.js");

const{ verifyJWT } = require("../middlewares/auth.middleware.js")
const{ upload } = require("../middlewares/multer.middleware.js")

const router = Router()

router.use(verifyJWT)
router.route("/").get(getAllVideos)
router.route("/publish").post(
    upload.fields([
        {
            name: "videoFile",
            maxCount: 1
        },
        {
            name: "thumbnail",
            maxCount: 1
        }
    ]),
    publishAVideo
)
router.route("/:videoId").get(getVideoById)
router.route("/:videoId").patch(
    upload.single("thumbnail"),
    updateVideo
)
router.route("/:videoId").delete(deleteVideo)
router.route("/toggle/publish/:videoId").patch(togglePublishStatus)

module.exports = router;