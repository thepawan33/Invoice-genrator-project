const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {
  saveRdrctUrl,
  validateUser,
  validateLogin,
  validateForget,
} = require("../middleware");
const userController = require("../controllers/user");

router
  .route("/signup")
  .get(userController.signupForm)
  .post(validateUser, wrapAsync(userController.addSignupData));

router.post("/otp", wrapAsync(userController.otpGenrator));
router.get("/home", (req, res) => {
  res.render("allPage/home.ejs");
});
router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRdrctUrl,
    validateLogin,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    userController.login
  );

router
  .route("/login/forget")
  .get(userController.renderForgetForm)
  .put(validateForget, wrapAsync(userController.newSavePass));

router.get("/logout", userController.logout);

module.exports = router;
