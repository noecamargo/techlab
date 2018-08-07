const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const adoptCtrl = require('./adopt.controller');

const router = express.Router(); // eslint-disable-line new-cap

router
  .route('/')
  /** GET /api/adopts - Get list of adopts */
  .get(adoptCtrl.list)

  /** POST /api/adopts - Create new adopt */
  .post(validate(paramValidation.createAdopt), adoptCtrl.create);

router
  .route('/:adoptId')
  /** GET /api/adopts/:adoptId - Get adopt */
  .get(adoptCtrl.get)

  /** PUT /api/adopts/:adoptId - Update adopt */
  .put(validate(paramValidation.updateAdopt), adoptCtrl.update)

  /** DELETE /api/adopts/:adoptId - Delete adopt */
  .delete(adoptCtrl.remove);

/** Load adopt when API with adoptId route parameter is hit */
router.param('adoptId', adoptCtrl.load);

module.exports = router;
