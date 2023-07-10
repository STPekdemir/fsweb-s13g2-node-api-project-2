const mongoose = require("mongoose");

const constumerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    university: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    ganoIsOverThree: {
      type: String,
      required: true,
    },
    firstWorkEnterDate: {
      type: Number,
      required: true,
    },
    sector: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    creditType: {
      type: String,
      required: true,
    },
    isOkay: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    creditScore: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      default: "Hesaplanamadı",
    },
    preference: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      default: "Hesaplanamadı",
    },
    exception: {
      type: mongoose.Schema.Types.Mixed,
      default: { none: "none" },
    },
    tf_id: {
      type: String,
      required: false,
    },
    isSendToPipeDrive: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Constumers", constumerSchema);
