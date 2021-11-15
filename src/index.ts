import express from "express";
import config from "./config";
import heartDance from "./route/heartDance";

const app = express();

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type, Accept "
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  req.method === "OPTIONS" ? res.status(200).end() : next();
});

app.use(express.json());

app.use(heartDance);

app.use(express.static("public"));

app.listen(config.port, () => {
  console.log(`the serve is running on the port ${config.port}`);
});
