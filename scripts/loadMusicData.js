// Source: AWS SDK docs

const fs = require("fs");
const path = require("path");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { docClient } = require("../config/db");

// read JSON file
const filePath = path.join(__dirname, "../data/a1.json");
const songs = JSON.parse(fs.readFileSync(filePath, "utf-8"));

const loadMusicData = async () => {
  try {
   for (const song of songs.songs) {

  const item = {
    artist: song.artist,
    title_year: `${song.title}#${song.year}`,
    title: song.title,
    year: Number(song.year),
    album: song.album,
    img_url: song.img_url
  };

  await docClient.send(new PutCommand({
    TableName: "music",
    Item: item
  }));
}
    console.log("Music data loaded successfully");

  } catch (err) {
    console.error("Error loading data:", err);
  }
};

module.exports = loadMusicData;