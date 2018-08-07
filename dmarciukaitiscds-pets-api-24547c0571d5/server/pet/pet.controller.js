const Pet = require('./pet.model');
/**
 * Load pet and append to req.
 */
function load(req, res, next, id) {
  Pet.get(id)
    .then((pet) => {
      req.pet = pet; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get pet
 * @returns {Pet}
 */
function get(req, res) {
  return res.json(req.pet);
}

/**
 * Create new pet
 * @property {string} req.body.name - The name of pet.
 * @property {string} req.body.age - The age of pet.
 * @property {string} req.body.size - The size of pet.
 * @property {string} req.body.color - The color of pet.
 * @property {string} req.body.sex - The sex of pet.
 * @property {string} req.body.description - The description of pet.
 * @property {Array<string>} req.body.photos - The photos of pet.
 * @property {string} req.body.profilePicture - The profilePicture of pet.
 * @returns {Pet}
 */
function create(req, res, next) {
  const petToCreate = req.body;
  const pet = new Pet(petToCreate);

  pet
    .save()
    .then(savedPet => res.json(savedPet))
    .catch(e => next(e));
}

/**
 * Update existing pet
 * @property {string} req.body.name - The name of pet.
 * @property {string} req.body.age - The age of pet.
 * @property {string} req.body.size - The size of pet.
 * @property {string} req.body.color - The color of pet.
 * @property {string} req.body.sex - The sex of pet.
 * @property {string} req.body.description - The description of pet.
 * @property {Array<string>} req.body.photos - The photos of pet.
 * @property {string} req.body.profilePicture - The profilePicture of pet.
 * @returns {Pet}
 */
function update(req, res, next) {
  const pet = Object.assign(req.pet, req.body);

  pet
    .save()
    .then(savedPet => res.json(savedPet))
    .catch(e => next(e));
}

/**
 * Get pet list.
 * @property {number} req.query.skip - Number of pets to be skipped.
 * @property {number} req.query.limit - Limit number of pets to be returned.
 * @returns {Pet[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Pet.list({ limit, skip })
    .then(pets => res.json(pets))
    .catch(e => next(e));
}

/**
 * Delete pet.
 * @returns {Pet}
 */
function remove(req, res, next) {
  const pet = req.pet;
  pet
    .remove()
    .then(deletedPet => res.json(deletedPet))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
