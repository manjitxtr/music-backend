const fs = require("fs");
const path = require("path");
const axios = require("axios");

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { docClient } = require("../config/db");

require("dotenv").config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
});

const bucketName = process.env.S3_BUCKET_NAME;

// Load JSON
const filePath = path.join(__dirname, "../data/a1.json");
const rawData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
const songs = rawData.songs;

const loadMusicData = async () => {
  try {
    if (!Array.isArray(songs)) {
      console.error("❌ songs is not an array");
      return;
    }

    for (const song of songs) {

      if (!song.img_url) continue;

      console.log(`Downloading: ${song.img_url}`);

      // 1) Download image
      const response = await axios({
        url: song.img_url,
        method: "GET",
        responseType: "arraybuffer",
      });

      // 2) Safe file name
      const fileName = `${song.artist}-${song.title}.jpg`
        .replace(/\s+/g, "_")
        .replace(/[^\w\-_.]/g, "");

      // 3) Upload to S3
      await s3.send(new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: response.data,
        ContentType: "image/jpeg",
      }));

      // 4) Build S3 URL
      const s3Url = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

      console.log(`Uploaded to S3: ${s3Url}`);

      // 5) Put into DynamoDB (overwrite OK)
      const item = {
        artist: String(song.artist), // PK
        title_year: `${song.title}#${song.year}`, // SK (must match your schema)
        title: song.title,
        year: Number(song.year),
        album: song.album,
        img_url: s3Url, // ✅ S3 URL stored
      };

      try {
        await docClient.send(new PutCommand({
          TableName: "music",
          Item: item,
        }));
        console.log(`✅ Stored in DB: ${song.title}`);
      } catch (dbErr) {
        console.error("❌ DB ERROR:", dbErr);
      }
    }

    console.log("🎉 Done: S3 + DynamoDB updated");

  } catch (err) {
    console.error("❌ Script error:", err);
  }
};

loadMusicData();