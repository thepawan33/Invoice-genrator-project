const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, validateInv } = require("../middleware.js");
const listController = require("../controllers/list.js");

router
  .route("/")
  .get(wrapAsync(listController.renderInvoiceForm))
  .post(validateInv, wrapAsync(listController.saveInvoiceData));

router.get("/invoice", wrapAsync(listController.renderInvoice));

router.post("/find", isLoggedIn, wrapAsync(listController.findCustomer));
module.exports = router;
