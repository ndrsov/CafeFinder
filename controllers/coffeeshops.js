const Coffeeshop = require('../models/coffeeshop');
const { cloudinary } = require('../cloudinary/index');

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

module.exports.index = async (req, res, next) => {
  const cafes = await Coffeeshop.find({});
  res.render('coffeeshops/index', { cafes });
};

module.exports.renderNewForm = (req, res) => {
  res.render('coffeeshops/new');
};

module.exports.createCafe = async (req, res, next) => {
  const geoData = await geocoder
    .forwardGeocode({
      query: `${req.body.cafe.title} ${req.body.cafe.location}`,
      limit: 1,
    })
    .send();

  const cafe = new Coffeeshop(req.body.cafe);
  cafe.geometry = geoData.body.features[0].geometry;
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
  const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  cafe.images.push(...imgs);
  await cafe.save();
  if (req.body.deleteImages) {
    for (const filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await cafe.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }

  req.flash('success', 'Succesfully updated café');
  res.redirect(`/coffeeshops/${cafe._id}`);
};

module.exports.deleteCafe = async (req, res) => {
  const { id } = req.params;
  const cafe = await Coffeeshop.findByIdAndDelete(id);
  req.flash('success', 'Succesfully deleted café');
  res.redirect('/coffeeshops');
};
