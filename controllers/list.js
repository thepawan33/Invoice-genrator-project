const Findadd = require("../models/searchId.js");
const Youradd = require("../models/yourAdd.js");
const Billadd = require("../models/address.js");
const Inv = require("../models/data.js");

module.exports.renderInvoiceForm = async (req, res) => {
  let oth = "",
    name = "",
    number = "",
    email = "",
    id = "";
  let y_name = "",
    y_number = "",
    y_email = "",
    y_address = "",
    url = "";
  if (req.user) {
    let dataSearch = await Findadd.find({ owner: req.user._id });
    let oldData = await Youradd.find({ owner: req.user._id });

    if (dataSearch.length > 0) {
      const newD = dataSearch[0];
      oth = newD.address;
      name = newD.name;
      number = newD.number;
      email = newD.email;
      id = newD.id_data;
    }
    if (oldData.length > 0) {
      const data = oldData[0];
      y_name = data.y_name;
      y_address = data.y_address;
      y_number = data.y_number;
      y_email = data.y_email;
      url = data.logo.url;
    }
  }
  res.render("allPage/add.ejs", {
    oth,
    name,
    number,
    email,
    id,
    y_name,
    y_address,
    y_number,
    y_email,
    url,
  });
};
module.exports.saveInvoiceData = async (req, res) => {
  try {
    if (req.user) {
      await Inv.deleteMany({
        owner: req.user.id,
      });
    }
    await Inv.deleteMany({
      sessionId: req.session.id,
    });
    let inData = new Inv(req.body);
    inData.sessionId = req.session.id;
    if (req.user) {
      inData.owner = req.user._id;
    }
    await inData.save();
    res.redirect("/list/invoice");
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/list");
  }
};
module.exports.renderInvoice = async (req, res) => {
  try {
    let d = [];
    if (req.user) {
      let data = await Inv.findOne({
        owner: req.user.id,
      });
      d.push(data);
    } else {
      let data = await Inv.findOne({
        sessionId: req.session.id,
      });
      d.push(data);
    }

    let data1 = d[0];
    if (!data1) {
      req.flash("error", "Sorry not available any invoice !");
      res.redirect("/list");
    } else {
      res.render("allPage/index.ejs", { data1 });
    }
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/list");
  }
};
module.exports.findCustomer = async (req, res) => {
  let { id } = req.body;

  let result = await Billadd.findOne({
    $and: [{ owner: req.user._id }, { id_data: id }],
  });
  await Findadd.deleteMany({ owner: req.user._id });
  let addData = await Findadd.insertMany([
    {
      name: result.name,
      number: result.number,
      email: result.email,
      id_data: result.id_data,
      address: result.address,
      owner: result.owner,
    },
  ]);
  res.status(200).send("ok");
};
