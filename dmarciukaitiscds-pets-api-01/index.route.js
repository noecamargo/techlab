const express = require('express');
const petRoutes = require('./server/pet/pet.route');
const adoptRoutes = require('./server/adopt/adopt.route');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

// mount user routes at /adopts
router.use('/adopts', adoptRoutes);

// mount pet routes at /pet
router.use('/pets', petRoutes);

module.exports = router;
