const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Pet Schema
 */
const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: String
  },
  size: {
    type: String
  },
  color: {
    type: String
  },
  sex: {
    type: String,
    enum: ['male', 'female']
  },
  description: {
    type: String
  },
  breed: {
    type: String
  },
  profilePicture: {
    type: String
  },
  photos: [
    {
      type: String
    }
  ],
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
PetSchema.method({});

/**
 * Statics
 */
PetSchema.statics = {
  /**
   * Get pet
   * @param {ObjectId} id - The objectId of pet.
   * @returns {Promise<Pet, APIError>}
   */
  get(id) {
    return this.findById(id)
      .populate('adopt')
      .exec()
      .then((pet) => {
        if (pet) {
          return pet;
        }
        const err = new APIError('No such pet exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List pets in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of pets to be skipped.
   * @param {number} limit - Limit number of pets to be returned.
   * @returns {Promise<Pet[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .populate('adopt')
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Pet
 */
module.exports = mongoose.model('Pet', PetSchema);
