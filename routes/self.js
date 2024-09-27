const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, validateYou } = require("../middleware.js");
const selfController = require("../controllers/self.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(isLoggedIn, selfController.selfAddForm)
  .post(
    isLoggedIn,
    upload.single("logo"),
    validateYou,
    wrapAsync(selfController.saveData)
  );
module.exports = router;
