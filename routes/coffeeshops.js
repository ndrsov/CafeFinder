const express = require('express');
const router = express.Router();

const coffeeshops = require('../controllers/coffeeshops');

const catchAsync = require('../utilities/catchAsync');
const { isLoggedIn, isAuthor, validateCafe } = require('../middleware');

const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router
  .route('/')
  .get(catchAsync(coffeeshops.index))
  .post(
    isLoggedIn,
    upload.array('image'),
    validateCafe,
    catchAsync(coffeeshops.createCafe)
  );

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
