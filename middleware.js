const ExpressError = require("./utils/ExpressErr.js");
const {
  addSchema,
  invoiceSchema,
  yourSchema,
  userSignup,
  userLogin,
  userForget,
} = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "Please login");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRdrctUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.validateCust = (req, res, next) => {
  let { error } = addSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
module.exports.validateInv = (req, res, next) => {
  let { error } = invoiceSchema.validate(req.body);
  if (error) {
    let errmsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, errmsg);
  } else {
    next();
  }
};
module.exports.validateYou = (req, res, next) => {
  const { error } = yourSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, errMsg);
  } else {
    next();
  }
};

module.exports.validateUser = (req, res, next) => {
  let { error } = userSignup.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateForget = (req, res, next) => {
  let { error } = userForget.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateLogin = (req, res, next) => {
  let { error } = userLogin.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
