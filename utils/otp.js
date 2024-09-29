const speakeasy = require("speakeasy");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
console.log("email :", process.env.EMAIL);
console.log("pass :", process.env.PASSWORD);

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
