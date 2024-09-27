const Joi = require("joi");

module.exports.addSchema = Joi.object({
  name: Joi.string().required(),
  number: Joi.number().required(),
  id_data: Joi.string().required(),
  address: Joi.string().required(),
  email: Joi.string().allow("", null),
});

module.exports.yourSchema = Joi.object({
  y_name: Joi.string().required(),
  y_number: Joi.number().required(),
  y_email: Joi.string().required(),
  y_address: Joi.string().required(),
});

module.exports.userSignup = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.required(),
  otp: Joi.number().required(),
});
module.exports.userForget = Joi.object({
  email: Joi.string().email().required(),
  Newpassword: Joi.required(),
  otp: Joi.number().required(),
});

module.exports.userLogin = Joi.object({
  username: Joi.string().required(),
  password: Joi.required(),
});

module.exports.invoiceSchema = Joi.object({
  cust_name: Joi.string().required(),
  cust_number: Joi.number().required().min(0),
  cust_email: Joi.string().allow("", null),
  bill: Joi.string().required(),
  id: Joi.any().allow("", null),
  y_name: Joi.string().required(),
  y_number: Joi.number().required().min(10),
  y_email: Joi.string().required(),
  from: Joi.string().required(),
  payment: Joi.string().required(),
  note: Joi.string().required(),
  date: Joi.string().required(),
  logo: Joi.allow("", null),
  alt: Joi.allow("", null),
  it_name: Joi.alternatives().try(
    Joi.string(),
    Joi.array().items(Joi.string())
  ),
  it_quantity: Joi.alternatives().try(
    Joi.number(),
    Joi.array().items(Joi.number())
  ),
  it_unit: Joi.alternatives().try(
    Joi.string(),
    Joi.array().items(Joi.string())
  ),
  it_price: Joi.alternatives().try(
    Joi.number(),
    Joi.array().items(Joi.number())
  ),
  tax_name: Joi.alternatives().try(
    Joi.string(),
    Joi.array().items(Joi.string())
  ),
  tax_percent: Joi.alternatives().try(
    Joi.number(),
    Joi.array().items(Joi.number())
  ),
});
