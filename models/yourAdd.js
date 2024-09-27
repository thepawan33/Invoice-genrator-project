const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addSchema = new Schema({
  y_name: {
    type: String,
    required: true,
  },
  y_number: {
    type: Number,
    required: true,
  },
  y_email: {
    type: String,
  },
  y_address: {
    type: String,
    required: true,
  },
  logo: {
    filename: String,
    url: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Youradd = mongoose.model("Youradd", addSchema);
module.exports = Youradd;
