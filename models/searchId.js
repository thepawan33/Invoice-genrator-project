const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let findSchema = new Schema({
  name: {
    type: String,
  },
  number: {
    type: Number,
  },
  email: {
    type: String,
  },
  id_data: {
    type: String,
  },
  address: {
    type: String,
  },
  owner: {
    type: String,
  },
});

const Findadd = mongoose.model("Findadd", findSchema);

module.exports = Findadd;
