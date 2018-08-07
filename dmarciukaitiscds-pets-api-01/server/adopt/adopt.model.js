const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Adopt Schema
 */
const AdoptSchema = new mongoose.Schema({
  message: {
    type: String
  },
  contact: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
AdoptSchema.method({});

/**
 * Statics
 */
AdoptSchema.statics = {
  /**
   * Get adopt
   * @param {ObjectId} id - The objectId of adopt.
   * @returns {Promise<Adopt, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((adopt) => {
        if (adopt) {
          return adopt;
        }
        const err = new APIError('No such adopt exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List adopts in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of adopts to be skipped.
   * @param {number} limit - Limit number of adopts to be returned.
   * @returns {Promise<Adopt[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Adopt
 */
module.exports = mongoose.model('Adopt', AdoptSchema);
