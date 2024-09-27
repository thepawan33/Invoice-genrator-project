const Youradd = require("../models/yourAdd.js");
const { cloudinary } = require("../cloudConfig.js");
module.exports.selfAddForm = (req, res) => {
  res.render("allPage/yourAdd.ejs");
};
module.exports.saveData = async (req, res) => {
  let delData = await Youradd.findOneAndDelete({ owner: req.user._id });
  if (delData) {
    const publicId = delData.logo.filename;
    await cloudinary.uploader.destroy(publicId);
  }
  let data = await Youradd(req.body);
  data.owner = req.user._id;
  if (req.file !== undefined) {
    const filename = req.file.filename;
    const url = req.file.path;
    data.logo = { filename, url };
  }
  await data.save();
  if (data) {
    req.flash("success", "Address added Succesfully :)");
  }
  res.redirect("/list");
};
