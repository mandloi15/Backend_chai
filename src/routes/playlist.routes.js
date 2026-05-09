const{ Router } = require("express")
const{
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
} = require("../controllers/playlist.controller.js")

const { verifyJWT } = require ("../middlewares/auth.middleware.js")

const router = Router()

router.use(verifyJWT)
router.route("/")
.post(createPlaylist)
router.route("/user/:userId")
.get(getUserPlaylists)
router.route("/:playlistId")
.get(getPlaylistById)
.patch(updatePlaylist)
.delete(deletePlaylist)

router.route("/add/:videoId/:playlistId")
.patch(addVideoToPlaylist)
router.route("/remove/:videoId/:playlistId")
.patch(removeVideoFromPlaylist)

module.exports = router