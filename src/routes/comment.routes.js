const { Router } = require("express")
const {
    addComment,
    deleteComment,
    getVideoComments,
    updateComment
} = require("../controllers/comment.controller.js")

const { verifyJWT } = require( "../middlewares/auth.middleware.js")

const router = Router();

router.use(verifyJWT);

router.route("/:videoId").get(getVideoComments);

router.route("/add/:videoId").post(addComment);

router.route("/c/:commentId").patch(updateComment);

router.route("/c/:commentId").delete(deleteComment);

module.exports = router;