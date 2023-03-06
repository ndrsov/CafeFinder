const Coffeeshop = require('../models/coffeeshop');

module.exports.index = async (req, res, next) => {
  const cafes = await Coffeeshop.find({});
  res.render('coffeeshops/index', { cafes });
};

module.exports.renderNewForm = (req, res) => {
  res.render('coffeeshops/new');
};

module.exports.createCafe = async (req, res, next) => {
  const cafe = new Coffeeshop(req.body.cafe);
  cafe.images = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  cafe.author = req.user._id;
  await cafe.save();
  req.flash('success', 'Succesfully made a new café');
  res.redirect(`/coffeeshops/${cafe._id}`);
};

module.exports.showCafe = async (req, res) => {
  const cafe = await Coffeeshop.findById(req.params.id)
    .populate({ path: 'reviews', populate: { path: 'author' } })
    .populate('author');
  if (!cafe) {
    req.flash('error', 'Cannot find that specific café');
    return res.redirect('/coffeeshops');
  }
  res.render('coffeeshops/show', { cafe });
};

module.exports.renderEditForm = async (req, res) => {
  const cafe = await Coffeeshop.findById(req.params.id);
  if (!cafe) {
    req.flash('error', 'Cannot find that specific café');
    return res.redirect('/coffeeshops');
  }
  res.render('coffeeshops/edit', { cafe });
};

module.exports.updateCafe = async (req, res) => {
  const { id } = req.params;
  const cafe = await Coffeeshop.findByIdAndUpdate(id, {
    ...req.body.cafe,
  });
  req.flash('success', 'Succesfully updated café');
  res.redirect(`/coffeeshops/${cafe._id}`);
};

module.exports.deleteCafe = async (req, res) => {
  const { id } = req.params;
  const cafe = await Coffeeshop.findByIdAndDelete(id);
  req.flash('success', 'Succesfully deleted café');
  res.redirect('/coffeeshops');
};
