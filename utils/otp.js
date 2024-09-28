const speakeasy = require("speakeasy");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.Password,
  },
});

const generateSecret = () => {
  let secret = speakeasy.generateSecret({ length: 4 });
  return secret;
};
const generateOtp = (secret) => {
  return speakeasy.totp({
    secret: secret.base32,
    encoding: "base32",
  });
};

module.exports = {
  transporter,
  generateSecret,
  generateOtp,
};
