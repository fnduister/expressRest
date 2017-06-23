import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Todo Schema
 */
const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    maxlength: 50,
    required: [true, 'please enter a text'],
    unique: [true, 'this todo already exist']
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
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

// Duplicate the ID field.
TodoSchema.virtual('id').get(() => {
  this._id.toHexString();
});

// Ensure virtual fields are serialised.
TodoSchema.set('toJSON', {
  virtuals: true
});

/**
 * Methods
 */
TodoSchema.method({
});

/**
 * Statics
 */
TodoSchema.statics = {
  /**
   * Get Todo
   * @param {ObjectId} id - The objectId of Todo.
   * @returns {Promise<Todo, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((todo) => {
        if (todo) {
          return todo;
        }
        const err = new APIError('No such Todo exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List Todos in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of Todos to be skipped.
   * @param {number} limit - Limit number of Todos to be returned.
   * @returns {Promise<Todo[]>}
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
 * @typedef Todo
 */
export default mongoose.model('Todo', TodoSchema);
