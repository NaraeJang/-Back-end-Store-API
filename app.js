const express = require("express");
const app = express();
require("dotenv").config();

app.get("/", (req, res) => {
  res.send(`<h1>home page</h>`);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}...`);
});
