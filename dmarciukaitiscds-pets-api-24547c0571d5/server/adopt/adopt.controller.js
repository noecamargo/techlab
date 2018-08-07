const Adopt = require('./adopt.model');

/**
 * Load adopt and append to req.
 */
function load(req, res, next, id) {
  Adopt.get(id)
    .then((adopt) => {
      req.adopt = adopt; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get adopt
 * @returns {Adopt}
 */
function get(req, res) {
  return res.json(req.adopt);
}

/**
 * Create new adopt
 * @property {string} req.body.message - The message of adopt.
 * @property {string} req.body.contact - The contact of adopt.
 * @returns {Adopt}
 */
function create(req, res, next) {
  const adoptToCreate = req.body;
  createMethod(adoptToCreate, (err, adopt) => {
    if (err) {
      next(err);
    } else {
      res.json(adopt);
    }
  });
}

function createMethod(data, next) {
  const adopt = new Adopt(data);

  adopt
    .save()
    .then(savedAdopt => next(null, savedAdopt))
    .catch(e => next(e));
}

/**
 * Update existing adopt
 * @property {string} req.body.message - The message of adopt.
 * @property {string} req.body.contact - The contact of adopt.
 * @returns {Adopt}
 */
function update(req, res, next) {
  const adopt = Object.assign(req.adopt, req.body);

  adopt
    .save()
    .then(savedAdopt => res.json(savedAdopt))
    .catch(e => next(e));
}

/**
 * Get adopt list.
 * @property {number} req.query.skip - Number of adopts to be skipped.
 * @property {number} req.query.limit - Limit number of adopts to be returned.
 * @returns {Adopt[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Adopt.list({ limit, skip })
    .then(adopts => res.json(adopts))
    .catch(e => next(e));
}

/**
 * Delete adopt.
 * @returns {Adopt}
 */
function remove(req, res, next) {
  const adopt = req.adopt;
  adopt
    .remove()
    .then(deletedAdopt => res.json(deletedAdopt))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove, createMethod };
