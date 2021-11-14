import mongoose from "mongoose";

export default new mongoose.Schema(
  {
    locate: {
      type: String,
      required: [true, "need locate info"],
    },
    mode: {
      type: String,
      required: [true, "need mode info(社招/日常实习)"],
    },
    job: {
      type: String,
      required: [true, "need job info"],
    },
    name: {
      type: String,
      required: [true, "need name info"],
    },
    ability: [String],
    description: [String],
  },
  {
    collection: "heartDance",
  }
);

export interface heartDanceSchema {
  locate: string;
  mode: "社招" | "日常实习";
  job: string;
  name: string;
  ability: string[];
  description: string[];
}
