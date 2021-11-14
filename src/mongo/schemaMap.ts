import { Schema } from "mongoose";
import heartDance from "./heartDance";

export const schemaMap = new Map<string, Schema>();

schemaMap.set("heartDance", heartDance);

export default schemaMap;
