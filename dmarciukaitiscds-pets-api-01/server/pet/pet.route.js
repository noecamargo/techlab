const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const petCtrl = require('./pet.controller');

const router = express.Router(); // eslint-disable-line new-cap

router
  .route('/:petId/adopt')
  /** POST /api/pets/:petId/adopt - Adopt a pet */
  .post(validate(paramValidation.createAdopt), petCtrl.adoptPet);

router
  .route('/')
  /** GET /api/pets - Get list of pets */
  .get(petCtrl.list)

  /** POST /api/pets - Create new pet */
  .post(validate(paramValidation.createPet), petCtrl.create);

router
  .route('/:petId')
  /** GET /api/pets/:petId - Get pet */
  .get(petCtrl.get)

  /** PUT /api/pets/:petId - Update pet */
  .put(validate(paramValidation.updatePet), petCtrl.update)

  /** DELETE /api/pets/:petId - Delete pet */
  .delete(petCtrl.remove);

/** Load pet when API with petId route parameter is hit */
router.param('petId', petCtrl.load);

module.exports = router;
