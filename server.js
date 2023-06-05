const express = require("express");
const path = require("path");
const apiRouter = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.json());
Expand All
	@@ -13,47 +12,7 @@ app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.use("/api", apiRouter);