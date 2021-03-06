const express = require("express");
const path = require("path");
// get the port heroku uses from env variable
const port = process.env.PORT || 5050;
const app = express();

app.use(express.static(__dirname));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.listen(port);
console.log("Server started");
