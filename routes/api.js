const express = require("express");
const path = require("path");
const fs = require("fs");
const randId = require('../ranid')

const apiRouter = express.Router();

apiRouter.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../db/db.json"));
});

apiRouter.post("/notes", (req, res) => {
  const { title, text } = req.body;
  let id = randId()
  console.log(id)

  const newData = {
    title,
    text,
    id,
  };

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(newData);

      fs.writeFile(
        "./db/db.json",
        JSON.stringify(parsedData, null, 5),
        (err) => {
          err ? console.log(err) : console.log("sucess");
        }
      );
      res.redirect("/notes");
    }
  });
});

apiRouter.delete('/notes/:id', (req, res) => {
  const id = req.params.id;
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const parsedData = JSON.parse(data);
      const index = parsedData.findIndex(note => note.id === id);
      parsedData.splice(index, 1);
      fs.writeFile(
        "./db/db.json",
        JSON.stringify(parsedData, null, 5),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Note deleted successfully.");
            res.send()
          }
        }
      );
    }
  });
});

module.exports = apiRouter;