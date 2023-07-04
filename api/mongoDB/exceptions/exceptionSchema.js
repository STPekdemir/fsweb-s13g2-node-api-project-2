const mongoose = require("mongoose");

const exceptionSchema = new mongoose.Schema(
  {
    sector: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    preference: {
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
module.exports = mongoose.model("Exceptions", exceptionSchema);
