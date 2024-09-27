const User = require("../models/user");
const speakeasy = require("speakeasy");
const { transporter, generateSecret, generateOtp } = require("../utils/otp");
let newSecret = [];

module.exports.signupForm = (req, res) => {
  res.render("user/signup.ejs");
};

module.exports.otpGenrator = async (req, res) => {
  try {
    let secret = generateSecret();
    newSecret.length = 0;
    newSecret.push(secret);
    let otp = generateOtp(secret);
    const textMassage = `Your OTP is ${otp}. It’s valid for 3 Minute.
       If you didn’t request this, please ignore this message.`;
    const sendInfo = {
      from: `noreply@starkInvoice.com<${process.env.EMAIL}>`,
      to: `${req.body.email}`,
      subject: "Your OTP Code for Verification",
      text: textMassage,
    };
    await transporter.sendMail(sendInfo);
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.addSignupData = async (req, res, next) => {
  let { otp } = req.body;
  let secret = newSecret[0];
  const otpValidation = speakeasy.totp.verify({
    secret: secret.base32,
    encoding: "base32",
    token: otp,
    window: 6,
  });
  try {
    if (!otpValidation) {
      req.flash("error", "Please Enter Valid Otp");
      return res.redirect("/signup");
    }
    let { username, email, password } = req.body;
    let newUser = await new User({ username, email });
    let result = await User.register(newUser, password);
    req.login(result, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome :)");
      res.redirect("/list");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("user/login.ejs");
};
module.exports.renderForgetForm = (req, res) => {
  res.render("user/forgetPass.ejs");
};
module.exports.newSavePass = async (req, res, next) => {
  try {
    let { otp, Newpassword, email } = req.body;
    let secret = newSecret[0];
    const otpValidation = speakeasy.totp.verify({
      secret: secret.base32,
      encoding: "base32",
      token: otp,
      window: 6,
    });
    if (!otpValidation) {
      req.flash("error", "Please Enter Valid Otp");
      return res.redirect("/login/forget");
    }
    const finduser = await User.findOne({ email: email });
    if (!finduser) {
      req.flash("error", "Please enter valid email");
      return res.redirect("/login/forget");
    }
    finduser.setPassword(Newpassword, async (err) => {
      if (err) {
        next(err);
      }
      await finduser.save();
    });
    req.flash("success", "Password reset successfully !:)");
    res.redirect("/login");
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/login");
  }
};
module.exports.login = (req, res) => {
  let newRedirectUrl = res.locals.redirectUrl || "/list";
  req.flash("success", "welcome :)");
  res.redirect(newRedirectUrl);
};
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are log out successfully");
    res.redirect("/list");
  });
};
