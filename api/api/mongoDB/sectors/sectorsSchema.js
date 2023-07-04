const mongoose = require("mongoose");

const sectorSchema = new mongoose.Schema(
  {
    sector: {
      type: String,
      required: true,
      unique: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
module.exports = mongoose.model("Sectors", sectorSchema);
