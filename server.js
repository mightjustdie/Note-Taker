const fs = require("fs");

const express = require("express");
const path = require("path");

const app = express();
const PORT = 3001;

app.use(express.static("public"));
app.use(express.json());

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'db/db.json') )
})

// app.delete('/api/notes', (req, res) => {
//   const {title, text} = req.body; 

//   fs.readFile('./db/db.json', 'utf8', (err, data) => {
//     if(err) {
//       console.log(err)
//     } else {
//       const parsedData = JSON.parse(data); 
//       if (parsedData.includes(title, text)) {
//         console.log('ready to filter out of db')
//       }
//     }
//   })
// })

app.post("/api/notes", (req, res) => {

    const { title, text } = req.body;

    const newData = {
        title,
        text
      };

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(newData);

      fs.writeFile("db/db.json", JSON.stringify(parsedData, null, 5), (err) => {
        err ? console.log(err) : console.log("sucess");
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`serverlisteningport:${PORT}`);
});