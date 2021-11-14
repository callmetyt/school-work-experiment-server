import { TConfig } from "config";
import mongoose from "mongoose";
import schemaMap from "./schemaMap";

export async function connectToDB(config: TConfig, collection: string) {
  return await mongoose
    .connect(config.mongoUrl, {
      auth: {
        username: config.mongoUser,
        password: config.mongoPwd,
      },
      dbName: config.dbName,
    })
    .then((res) => {
      return res.model(collection, schemaMap.get(collection));
    })
    .catch((e) => console.error(e));
}
export default connectToDB;
