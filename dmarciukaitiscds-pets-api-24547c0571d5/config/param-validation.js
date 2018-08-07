const Joi = require('joi');

module.exports = {
  // POST /api/pets
  createPet: {
    body: {
      name: Joi.string().required()
    }
  },

  // UPDATE /api/pets/:userId
  updatePet: {
    params: {
      petId: Joi.string()
        .hex()
        .required()
    }
  },

  // POST /api/adopt
  createAdopt: {
    body: {
      contact: Joi.string().required()
    }
  },

  // UPDATE /api/adopt/:userId
  updateAdopt: {
    params: {
      adoptId: Joi.string()
        .hex()
        .required()
    }
  }
};
