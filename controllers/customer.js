const Billadd = require("../models/address.js");

module.exports.renderForm = (req, res) => {
  res.render("allPage/addCust.ejs");
};

module.exports.custAdd = async (req, res) => {
  try {
    let insertData = new Billadd(req.body);
    let userId = req.user._id;
    insertData.owner = userId;
    await insertData.save();
    req.flash("success", "Customer added successfully");
    res.redirect("/customer/all");
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/customer/add");
  }
};
module.exports.showCust = async (req, res) => {
  let data = await Billadd.find({ owner: req.user._id });
  res.render("allPage/allcust.ejs", { data });
};

module.exports.custSearch = async (req, res) => {
  let { q } = req.query;
  if (!q || q.trim() === "") {
    req.flash("error", "Search query cannot be empty.");
    return res.redirect("/customer/all");
  }
  let data = await Billadd.find({
    owner: req.user._id,
    $text: { $search: q },
  }).exec();
  if (data.length > 0) {
    req.flash("success", "Searching done :)");
    return res.render("allPage/search.ejs", { data });
  } else {
    req.flash("error", "Not Found !");
    return res.redirect("/customer/all");
  }
};
module.exports.editCustForm = async (req, res) => {
  let { id } = req.params;
  let data1 = await Billadd.find({
    $and: [{ owner: req.user._id }, { _id: id }],
  });
  let data = data1[0];
  res.render("allPage/allcustEdit.ejs", { data });
};
module.exports.editCust = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await Billadd.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    req.flash("success", "Updated customer details :)");
  } catch (e) {
    req.flash("error", e.message);
    res.redirect(`/customer/edit/${id}`);
  }
  res.redirect("/customer/all");
};

module.exports.deleteCust = async (req, res) => {
  let { id } = req.params;
  let data = await Billadd.findByIdAndDelete(id);
  if (data) {
    req.flash("success", "Deleted successfully");
  }
  res.redirect("/customer/all");
};
