import mongoose from "mongoose";
import slugify from "slugify";

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    slug: {
      type: String,
      unique: true,
    },
  },

  { timestamps: true }
);

export const Tag = mongoose.models?.Tag || mongoose.model("Tag", tagSchema);
