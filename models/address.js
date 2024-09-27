const { ref } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let newSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  id_data: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

newSchema.index({ owner: 1, number: 1 }, { unique: true });
newSchema.index({ owner: 1, id_data: 1 }, { unique: true });
newSchema.index({
  name: "text",
  email: "text",
  id_data: "text",
  address: "text",
});
const Billadd = mongoose.model("Billadd", newSchema);

module.exports = Billadd;
