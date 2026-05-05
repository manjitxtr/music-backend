const {
    getSongsByArtist,
    getSongsByAlbum,
    getAllSongs,addSong,deleteSong
} = require("../services/musicService");

// 1. GET /music/artist/:artist
const getByArtist = async (req, res) => {
    try {
        const artist = req.params.artist;

        const songs = await getSongsByArtist(artist);

        res.json(songs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. GET /music/album/:album
const getByAlbum = async (req, res) => {
    try {
        const album = req.params.album;

        const songs = await getSongsByAlbum(album);

        res.json(songs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. GET /music/all
const getAll = async (req, res) => {
    try {
        const songs = await getAllSongs();

        res.json(songs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createSong = async (req, res) => {
    try {
        const result = await addSong(req.body);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const removeSong = async (req, res) => {
    try {
        const { artist, title, year } = req.body;

        const result = await deleteSong(artist, title, year);

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getByArtist,
    getByAlbum,
    getAll,
    createSong,
    removeSong
};