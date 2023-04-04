const express = require("express");
const app = express();
const portListern = 4000;

const mongoDB = require("./db");

mongoDB();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type,Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(express.json());
app.use("/api", require("./Router/LoginUser"));



app.listen(portListern, () => {
  console.log(`Post listning on ${portListern}`);
});
