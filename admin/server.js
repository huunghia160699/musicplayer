const express = require('express')
const mysql = require('mysql')
const app = express()
const cors = require('cors')
var _ = require('underscore');

const PORT = 3000
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mymusicdb",
  });
  
  //connect to database
  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("Connection done");
  });

app.get('/', function(req, res) {
    res.json('this is homeqage')
})

app.get("/createdb", (req, res) => {
    let sql = "CREATE DATABASE nodemysql";
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log("result");
      res.send("Database Created");
    });
  });

  app.get("/toptrendingsong", (req, res) => {
    let sql = "SELECT * FROM songdatabase";
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      const songs = []
      for (let i = 0; i < 10; i++) {
        const STT = result[i].STT
        const songName = result[i].songName
        const artistName = result[i].artistName
        const date = result[i].songDate
        const songImgPath = result[i].songImgPath
        const songPath = result[i].songPath
        const durationTime = result[i].durationTime
        songs.push({
            STT,
            songName,
            artistName,
            date,
            songImgPath,
            songPath,
            durationTime
        })
      }
      res.json(songs);
    });
  });

app.listen(3000, () => {
    console.log(`SERVER RUNNING IN PORT ${PORT}`);
})