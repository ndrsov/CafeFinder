const express = require('express');
const router = express.Router();

const coffeeshops = require('../controllers/coffeeshops');

const catchAsync = require('../utilities/catchAsync');
const { isLoggedIn, isAuthor, validateCafe } = require('../middleware');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router
  .route('/')
  .get(catchAsync(coffeeshops.index))
  .post(upload.array('image'), (req, res) => {
    console.log(req.body, req.files);
    res.send('It worked');
  });
// .post(isLoggedIn, validateCafe, catchAsync(coffeeshops.createCafe));

router.get('/new', isLoggedIn, coffeeshops.renderNewForm);

router
  .route('/:id')
  .get(catchAsync(coffeeshops.showCafe))
  .put(isLoggedIn, isAuthor, validateCafe, catchAsync(coffeeshops.updateCafe))
  .delete(isLoggedIn, isAuthor, catchAsync(coffeeshops.deleteCafe));

router.get(
  '/:id/edit',
  isLoggedIn,
  isAuthor,
  catchAsync(coffeeshops.renderEditForm)
);

module.exports = router;
