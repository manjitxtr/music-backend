const express = require("express");
const router = express.Router();

const {
    getByArtist,
    getByAlbum,
    getAll,createSong,removeSong
} = require("../controllers/musicController");

// GET APIs
router.get("/artist/:artist", getByArtist);
router.get("/album/:album", getByAlbum);
router.get("/all", getAll);
router.post("/", createSong);
router.delete("/", removeSong);

module.exports = router;