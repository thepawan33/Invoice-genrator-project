const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let newSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  sessionId: {
    type: String,
  },
  cust_name: {
    type: String,
    required: true,
  },
  cust_number: {
    type: Number,
    required: true,
  },
  cust_email: {
    type: String,
  },

  bill: {
    type: String,
    required: true,
  },
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
  from: {
    type: String,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  logo: {
    type: String,
  },
  alt: {
    type: String,
  },
  it_name: {
    type: [String],
    required: true,
  },
  it_quantity: {
    type: [Number],
    required: true,
  },
  it_unit: {
    type: [String],
    required: true,
  },
  it_price: {
    type: [Number],
    required: true,
  },
  tax_name: {
    type: [String],
  },
  tax_percent: {
    type: [Number],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "24h",
  },
});

const Inv = mongoose.model("Inv", newSchema);
module.exports = Inv;
