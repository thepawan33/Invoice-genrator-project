const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, validateCust } = require("../middleware.js");
const custControllers = require("../controllers/customer.js");

router.get("/add", isLoggedIn, custControllers.renderForm);
router.post("/", isLoggedIn, validateCust, wrapAsync(custControllers.custAdd));
router.get("/all", isLoggedIn, wrapAsync(custControllers.showCust));
router.get("/search", isLoggedIn, wrapAsync(custControllers.custSearch));
router.get("/edit/:id", isLoggedIn, wrapAsync(custControllers.editCustForm));

router.put(
  "/:id",
  isLoggedIn,
  validateCust,
  wrapAsync(custControllers.editCust)
);
router.delete("/delete/:id", isLoggedIn, wrapAsync(custControllers.deleteCust));

module.exports = router;
