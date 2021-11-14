import express from "express";
import { connectToDB } from "../mongo";
import config from "../config";
import { Model } from "mongoose";
import { heartDanceSchema } from "mongo/heartDance";

const heartDance = express.Router();
let mongo: Model<heartDanceSchema, {}, {}, {}>;

// 连接数据库
heartDance.all("/heartDance/*", async function (req, res, next) {
  const connectRes = await connectToDB(config, "heartDance");
  if (typeof connectRes === "undefined") {
    res.json({
      code: "500",
      msg: "mongoDB connect false!",
    });
  } else {
    mongo = connectRes;
    next();
  }
});

// 搜索所有信息
heartDance.get("/heartDance/all", async function (req, res) {
  const queryRes = await mongo.find({});
  res.json({
    code: "200",
    msg: "query success!",
    data: queryRes,
  });
});

// 搜索指定信息
heartDance.post("/heartDance/search", async function (req, res) {
  let key: RegExp = new RegExp("");
  try {
    key = new RegExp(req.body.key, "i");
  } catch (e: any) {
    res.json({
      msg: e.toString(),
      code: "500",
    });
  }
  const queryRes = await mongo.find({
    $or: [{ locate: { $regex: key } }, { name: { $regex: key } }],
  });
  res.json({
    code: "200",
    msg: "query data success",
    data: queryRes,
  });
});

// 添加信息
heartDance.post("/heartDance/add", async function (req, res) {
  try {
    const newData = new mongo(req.body);
    const queryRes = await newData.save();
    res.json({
      code: "200",
      msg: "add new data success!",
      queryRes,
    });
  } catch (e: any) {
    res.json({
      code: "500",
      msg: e.toString(),
    });
  }
});

// 删除信息
heartDance.post("/heartDance/delete", async function (req, res) {
  try {
    const queryRes = await mongo.findOneAndDelete({
      _id: req.body._id,
    });
    res.json({
      code: "200",
      msg: "delete one data success!",
      data: queryRes,
    });
  } catch (e: any) {
    res.json({
      code: "500",
      msg: e.toString(),
    });
  }
});

export default heartDance;
