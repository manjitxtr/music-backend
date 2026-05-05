// Source: AWS SDK docs

const { QueryCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");
const { docClient } = require("../config/db");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { DeleteCommand } = require("@aws-sdk/lib-dynamodb");



// Get songs by artist (QUERY)
const getSongsByArtist = async (artist) => {
    const result = await docClient.send(new QueryCommand({
        TableName: "music",
        KeyConditionExpression: "artist = :artist",
        ExpressionAttributeValues: {
            ":artist": artist
        }
    }));

    return result.Items;
};

// Get songs by album (GSI QUERY)
const getSongsByAlbum = async (album) => {
    const result = await docClient.send(new QueryCommand({
        TableName: "music",
        IndexName: "album-index", // GSI
        KeyConditionExpression: "album = :album",
        ExpressionAttributeValues: {
            ":album": album
        }
    }));

    return result.Items;
};

// Get all songs (SCAN)
const getAllSongs = async () => {
    const result = await docClient.send(new ScanCommand({
        TableName: "music"
    }));

    return result.Items;
};

// Add new song
const addSong = async (song) => {

    const item = {
        artist: song.artist,
        title_year: `${song.title}#${song.year}`, // IMPORTANT
        title: song.title,
        year: Number(song.year),
        album: song.album,
        img_url: song.img_url
    };

    await docClient.send(new PutCommand({
        TableName: "music",
        Item: item
    }));

    return { success: true };
};


// Delete song
const deleteSong = async (artist, title, year) => {

    const title_year = `${title}#${year}`;

    await docClient.send(new DeleteCommand({
        TableName: "music",
        Key: {
            artist,
            title_year
        }
    }));

    return { success: true };
};

module.exports = {
    getSongsByArtist,
    getSongsByAlbum,
    getAllSongs,
    addSong,
    deleteSong
};